import React, { useState, useEffect } from 'react';
import axios from 'axios';  // Import Axios for making HTTP requests
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { toast } from 'react-toastify'; // Import toast for success/error messages

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Fetch users from the backend when the component mounts
  useEffect(() => {
    fetchUsers();  // Fetch users when the component is first rendered
  }, []);

  const fetchUsers = () => {
    axios.get('http://localhost:8080/api/users')  // Backend URL
      .then(response => {
        setUsers(response.data);  // Store users in the state
      })
      .catch(error => {
        console.error('Error fetching users:', error);
        toast.error('Error fetching users');
      });
  };

  // Handle delete user
  const handleDelete = (id) => {
    axios.delete(`http://localhost:8080/api/users/${id}`)  // Backend URL
      .then(response => {
        setUsers(users.filter(user => user.id !== id)); // Remove user from state
        toast.success('User deleted successfully!');
      })
      .catch(error => {
        console.error('Error deleting user:', error);
        toast.error('Error deleting user');
      });
  };

  // Handle update user
  const handleUpdate = () => {
    axios.put(`http://localhost:8080/api/users/${selectedUser.id}`, selectedUser)  // Backend URL
      .then(response => {
        setUsers(users.map(user => user.id === selectedUser.id ? selectedUser : user)); // Update user in state
        setOpenDialog(false);
        toast.success('User updated successfully!');
      })
      .catch(error => {
        console.error('Error updating user:', error);
        toast.error('Error updating user');
      });
  };

  // Open dialog to update user
  const handleOpenDialog = (user) => {
    setSelectedUser(user);
    setOpenDialog(true);
  };

  // Close dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Handle input change in the dialog
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedUser({ ...selectedUser, [name]: value });
  };

  return (
    <div>
      <h1>User Management</h1>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>GitHub</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.gender}</TableCell>
                <TableCell>{user.github}</TableCell>
                <TableCell>
                  <Button onClick={() => handleOpenDialog(user)} variant="outlined" color="primary">
                    Update
                  </Button>
                  <Button onClick={() => handleDelete(user.id)} variant="outlined" color="secondary" style={{ marginLeft: '10px' }}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Update User Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Update User</DialogTitle>
        <DialogContent>
          {selectedUser && (
            <>
              <TextField
                label="Name"
                fullWidth
                value={selectedUser.name}
                name="name"
                onChange={handleInputChange}
                style={{ marginBottom: '10px' }}
              />
              <TextField
                label="Email"
                fullWidth
                value={selectedUser.email}
                name="email"
                onChange={handleInputChange}
                style={{ marginBottom: '10px' }}
              />
              <TextField
                label="Phone"
                fullWidth
                value={selectedUser.phone}
                name="phone"
                onChange={handleInputChange}
                style={{ marginBottom: '10px' }}
              />
              <TextField
                label="GitHub"
                fullWidth
                value={selectedUser.github}
                name="github"
                onChange={handleInputChange}
                style={{ marginBottom: '10px' }}
              />
              <TextField
                label="Gender"
                fullWidth
                value={selectedUser.gender}
                name="gender"
                onChange={handleInputChange}
                style={{ marginBottom: '10px' }}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdate} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserManagement;
