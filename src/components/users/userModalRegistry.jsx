import { closeModal } from '../../features/ui/modalSlice';
import { removeUser } from '../../features/users/usersSlice';
import { addToast } from '../../features/ui/toastSlice';
import { registerModalRegistry } from '../../utils/registryManager';
import UserForm from './UserForm';

/**
 * User Modal Registry
 * Defines modal content for all user CRUD operations
 */
const userModalRegistry = {
  // Create User Modal
  create: (props, dispatch) => (
    <UserForm onDone={() => dispatch(closeModal())} />
  ),

  // Edit User Modal
  edit: (props, dispatch) => (
    <UserForm 
      user={props.user} 
      onDone={() => dispatch(closeModal())} 
    />
  ),

  // User Details Modal
  details: (props, dispatch) => {
    const { user } = props;

    return (
      <>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                ID
              </label>
              <p className="text-gray-900 font-medium">{user?.id}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Name
              </label>
              <p className="text-gray-900 font-medium">{user?.name}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Email
              </label>
              <p className="text-gray-900">{user?.email}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Status
              </label>
              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                  user?.status === 'Active'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {user?.status}
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={() => dispatch(closeModal())}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md transition-colors font-medium"
          >
            Close
          </button>
        </div>
      </>
    );
  },

  // Delete Confirmation Modal
  confirmDelete: (props, dispatch) => {
    const { user } = props;

    const handleConfirmDelete = async () => {
      if (!user?.id) return;
      
      try {
        await dispatch(removeUser(user.id));
        dispatch(addToast({
          type: 'success',
          message: `User "${user.name}" deleted successfully!`
        }));
        dispatch(closeModal());
      } catch {
        dispatch(addToast({
          type: 'error',
          message: 'Failed to delete user. Please try again.'
        }));
      }
    };

    return (
      <>
        <p className="text-gray-600 mb-6 text-center">
          Are you sure you want to delete{' '}
          <strong className="text-gray-900">{user?.name}</strong>?
          <br />
          <span className="text-sm text-gray-500 mt-2 block">
            This action cannot be undone.
          </span>
        </p>

        <div className="flex gap-3 justify-end">
          <button
            onClick={() => dispatch(closeModal())}
            className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirmDelete}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors font-medium"
          >
            Yes, Delete
          </button>
        </div>
      </>
    );
  },
};

// Registry Key Constant
export const USER_MODAL_REGISTRY_KEY = 'userModals';

// Register the modal registry with the global registry manager
registerModalRegistry(USER_MODAL_REGISTRY_KEY, userModalRegistry);
