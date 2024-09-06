export const addUser = (user) => ({
  type: "ADD_USER",
  payload: user,
});

export const removeUser = (id) => ({
  type: "REMOVE_USER",
  payload: id,
});

export const editUser = (user) => ({
  type: "EDIT_USER",
  payload: user,
});
