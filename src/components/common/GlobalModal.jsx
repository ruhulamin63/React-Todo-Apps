import { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../features/ui/modalSlice';
import { getModalRegistry } from '../../utils/registryManager';

export default function GlobalModal({ children, renderContent }) {
  const dispatch = useDispatch();
  const modal = useSelector(s => s.modal);

  const isOpen = modal.open;
  const onClose = useCallback(() => dispatch(closeModal()), [dispatch]);

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Determine Title
  const title = modal.props?.title || 'Modal';

  // Get registry from registry manager using the key
  const registryKey = modal.props?.registryKey;
  const registry = registryKey ? getModalRegistry(registryKey) : null;

  // Determine Content
  let content;
  if (children) {
    content = children;
  } else if (renderContent) {
    content = renderContent(modal, onClose);
  } else if (registry && modal.mode && registry[modal.mode]) {
    // Use registry to render content based on mode
    content = registry[modal.mode](modal.props || {}, dispatch);
  } else {
    content = <p className="text-gray-500">No content available</p>;
  }

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity">
      <div 
        className="bg-white rounded-xl shadow-2xl w-full max-w-md relative transform transition-all"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {content}
        </div>
      </div>
    </div>,
    document.body
  );
}