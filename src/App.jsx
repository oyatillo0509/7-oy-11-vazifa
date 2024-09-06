import React, { useState, useRef } from "react";
import "./App.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser, editUser } from "./action/userActions";

function App() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);

  const formikRef = useRef(null);
  const [editingUser, setEditingUser] = useState(null);

  const formik = useFormik({
    initialValues: {
      name: "",
      age: "",
      avatar: "",
      id: Date.now(),
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Name is required")
        .min(3, "Name must be at least 3 characters"),
      age: Yup.number()
        .required("Age is required")
        .min(1, "Age must be greater than 0"),
      avatar: Yup.string()
        .required("Avatar URL is required")
        .url("Enter a valid URL"),
    }),
    onSubmit: (values, { resetForm }) => {
      if (editingUser) {
        dispatch(editUser({ ...values, id: editingUser.id }));
        setEditingUser(null);
      } else {
        dispatch(addUser({ ...values, id: Date.now() }));
      }
      resetForm();
      formikRef.current.reset();
      alert("Form submitted successfully!");
    },
  });

  const handleEdit = (user) => {
    formik.setValues(user);
    setEditingUser(user);
  };

  const handleRemove = (id) => {
    dispatch(removeUser(id));
  };

  return (
    <div className="container mx-auto mt-8 p-4 shadow-md rounded-lg max-w-md">
      <form
        onSubmit={formik.handleSubmit}
        className="space-y-3"
        ref={formikRef}
      >
        <h2 className="text-xl font-semibold text-white text-center">
          User Form
        </h2>

        <div className="mb-3">
          <label
            className="block text-gray-600 font-medium mb-1"
            htmlFor="name"
          >
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Enter name.."
            className={`input input-bordered w-full rounded-md shadow-sm p-2 text-sm ${
              formik.touched.name && formik.errors.name
                ? "border-red-500"
                : "border-gray-300"
            }`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name ? (
            <p className="text-red-500 text-xs mt-1">{formik.errors.name}</p>
          ) : null}
        </div>

        <div className="mb-3">
          <label className="block text-gray-600 font-medium mb-1" htmlFor="age">
            Age
          </label>
          <input
            id="age"
            name="age"
            type="number"
            placeholder="Enter age..."
            className={`input input-bordered w-full rounded-md shadow-sm p-2 text-sm ${
              formik.touched.age && formik.errors.age
                ? "border-red-500"
                : "border-gray-300"
            }`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.age}
          />
          {formik.touched.age && formik.errors.age ? (
            <p className="text-red-500 text-xs mt-1">{formik.errors.age}</p>
          ) : null}
        </div>

        <div className="mb-3">
          <label
            className="block text-gray-600 font-medium mb-1"
            htmlFor="avatar"
          >
            Avatar URL
          </label>
          <input
            id="avatar"
            name="avatar"
            type="text"
            placeholder="Enter avatar image URL..."
            className={`input input-bordered w-full rounded-md shadow-sm p-2 text-sm ${
              formik.touched.avatar && formik.errors.avatar
                ? "border-red-500"
                : "border-gray-300"
            }`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.avatar}
          />
          {formik.touched.avatar && formik.errors.avatar ? (
            <p className="text-red-500 text-xs mt-1">{formik.errors.avatar}</p>
          ) : null}
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white font-medium rounded-md shadow-md text-sm hover:bg-blue-600 transition duration-300"
        >
          {editingUser ? "Update" : "Save"}
        </button>
      </form>

      <div className="mt-6">
        <h2 className="text-xl font-semibold text-white text-center">
          Users List
        </h2>
        <div className="grid grid-cols-1 gap-4 mt-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="card p-3 border border-gray-200 rounded-md shadow-sm"
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="w-16 h-16 object-cover rounded-full mx-auto mb-3 border-2 border-gray-300"
              />
              <h3 className="text-lg font-medium text-center">{user.name}</h3>
              <p className="text-center text-gray-500 text-sm">
                Age: {user.age}
              </p>
              <div className="flex justify-center gap-3 mt-3">
                <button
                  onClick={() => handleEdit(user)}
                  className="bg-yellow-400 text-white py-1 px-3 rounded-md text-xs hover:bg-yellow-500 transition duration-300"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleRemove(user.id)}
                  className="bg-red-500 text-white py-1 px-3 rounded-md text-xs hover:bg-red-600 transition duration-300"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
