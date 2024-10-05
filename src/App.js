import React, { useState } from "react";
import axios from "axios";
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  

  const handleUserAdded = (newUser) => {
    setUsers([...users, newUser]);
  };

  const handleUserUpdated = (updatedUser) => {
    const updatedUsers = users.map((user) =>
      user.id === updatedUser.id ? updatedUser : user
    );
    setUsers(updatedUsers);
    setSelectedUser(null); // Clear the form after updating
  };

  const handleEdit = (user) => {
    setSelectedUser(user); // Set the selected user for editing
  };
  const handleDelete = (id) => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(() => {
        const updatedUsers = users.filter((user) => user.id !== id);
        setUsers(updatedUsers); // Remove the user from the list
      })
      .catch((error) => console.error("Error deleting user:", error));
  };

  return (
    <div className="App">
      <h1>User Management</h1>
      <UserForm
        onUserAdded={handleUserAdded}
        onUserUpdated={handleUserUpdated}
        selectedUser={selectedUser}
      />
      <UserList users={users} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}

export default App;
