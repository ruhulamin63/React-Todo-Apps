import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../features/ui/modalSlice';
import UserForm from '../users/UserForm';
import { useDispatch as useReduxDispatch } from 'react-redux';
import { removeUser } from '../../features/users/usersSlice';
import { addToast } from '../../features/ui/toastSlice';

export default function GlobalModal() {
  const dispatch = useDispatch();
  const modal = useSelector(s => s.modal);
  const usersDispatch = useReduxDispatch();

  if (!modal.open) return null;

  const onClose = () => dispatch(closeModal());

  const handleDelete = async () => {
    const id = modal.props?.user?.id;
    if (!id) return;
    await usersDispatch(removeUser(id));
    dispatch(addToast({
      type: 'success',
      message: 'User deleted successfully!'
    }));
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
        >
          ✕
        </button>

        <div className="p-6">
          {modal.mode === 'create' && (
            <>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Create User</h3>
              <UserForm onDone={onClose} />
            </>
          )}

          {modal.mode === 'edit' && (
            <>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Edit User</h3>
              <UserForm user={modal.props?.user} onDone={onClose} />
            </>
          )}

          {modal.mode === 'confirmDelete' && (
            <>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Delete User</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete <strong className="text-gray-900">{modal.props?.user?.name}</strong>?
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
                >
                  Yes, delete
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}