import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addUser, editUser } from "../../features/users/usersSlice";
import { addToast } from "../../features/ui/toastSlice";

export default function UserForm({ user = null, onDone = () => {} }) {
  const dispatch = useDispatch();
  const isEditMode = !!user?.id;

  const [form, setForm] = useState({
    name: "",
    email: "",
    ...(isEditMode ? {} : { password: "", confirmPassword: "" }),
  });

  const [errors, setErrors] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        email: user.email || "",
        ...(isEditMode ? {} : { password: "", confirmPassword: "" }),
      });
    } else {
      setForm({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    }
  }, [user, isEditMode]);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Invalid email";

    // Only validate password fields when creating a new user (not in edit mode)
    if (!isEditMode) {
      if (!form.password || form.password.length < 6)
        e.password = "Password must be at least 6 characters";
      else if (form.password !== form.confirmPassword)
        e.confirmPassword = "Passwords do not match";
    }

    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const eobj = validate();
    if (Object.keys(eobj).length) {
      setErrors(eobj);
      return;
    }
    setSaving(true);

    try {
      // Prepare payload - exclude password fields when editing
      const payload = isEditMode
        ? { name: form.name, email: form.email }
        : form;

      if (user?.id) {
        await dispatch(editUser({ id: user.id, payload })).unwrap();
        dispatch(addToast({
          type: 'success',
          message: 'User updated successfully!'
        }));
      } else {
        await dispatch(addUser(payload)).unwrap();
        dispatch(addToast({
          type: 'success',
          message: 'User created successfully!'
        }));
      }
      onDone();
    } catch (err) {
      setErrors({ form: err?.message || "Save failed" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errors?.form && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
          {errors.form}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Name *
        </label>
        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter full name"
        />
        {errors?.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email *
        </label>
        <input
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter email address"
        />
        {errors?.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email}</p>
        )}
      </div>

      {!isEditMode && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password *
            </label>
            <input
              type="password"
              value={form.password || ""}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter password"
            />
            {errors?.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password *
            </label>
            <input
              type="password"
              value={form.confirmPassword || ""}
              onChange={(e) =>
                setForm({ ...form, confirmPassword: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Confirm password"
            />
            {errors?.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">
                {errors.confirmPassword}
              </p>
            )}
          </div>
        </>
      )}

      <div className="flex gap-3 justify-end pt-4">
        <button
          type="button"
          onClick={onDone}
          className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={saving}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? "Saving..." : isEditMode ? "Update User" : "Create User"}
        </button>
      </div>
    </form>
  );
}
