import React, { useState, useEffect } from "react";
import axios from "axios";

const UserForm = ({ onUserAdded, onUserUpdated, selectedUser }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (selectedUser) {
      setName(selectedUser.name);
      setEmail(selectedUser.email);
      setPhone(selectedUser.phone);
    }
  }, [selectedUser]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = { name, email, phone };

    if (selectedUser) {
      // Update user
      axios
        .put(
          `https://jsonplaceholder.typicode.com/users/${selectedUser.id}`,
          user
        )
        .then((response) => {
          onUserUpdated(response.data);
        })
        .catch((error) => console.error("Error updating user:", error));
    } else {
      // Create a new user
      axios
        .post("https://jsonplaceholder.typicode.com/users", user)
        .then((response) => {
          onUserAdded(response.data);
        })
        .catch((error) => console.error("Error creating user:", error));
    }

    // Clear the form after submission
    setName("");
    setEmail("");
    setPhone("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Phone</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </div>
      <button type="submit">{selectedUser ? "Update User" : "Add User"}</button>
    </form>
  );
};

export default UserForm;
