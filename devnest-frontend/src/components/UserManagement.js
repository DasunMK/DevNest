import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Button, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, TextField,
  Dialog, DialogActions, DialogContent, DialogTitle
} from '@mui/material';
import { toast } from 'react-toastify';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios.get('http://localhost:8080/api/users')
      .then(response => {
        setUsers(response.data);
        setFilteredUsers(response.data); // Initialize filteredUsers
      })
      .catch(error => {
        console.error('Error fetching users:', error);
        toast.error('Error fetching users');
      });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8080/api/users/${id}`)
      .then(() => {
        const updatedUsers = users.filter(user => user.id !== id);
        setUsers(updatedUsers);
        setFilteredUsers(updatedUsers);
        toast.success('User deleted successfully!');
      })
      .catch(error => {
        console.error('Error deleting user:', error);
        toast.error('Error deleting user');
      });
  };

  const handleUpdate = () => {
    axios.put(`http://localhost:8080/api/users/${selectedUser.id}`, selectedUser)
      .then(() => {
        const updatedUsers = users.map(user =>
          user.id === selectedUser.id ? selectedUser : user
        );
        setUsers(updatedUsers);
        setFilteredUsers(updatedUsers);
        setOpenDialog(false);
        toast.success('User updated successfully!');
      })
      .catch(error => {
        console.error('Error updating user:', error);
        toast.error('Error updating user');
      });
  };

  const handleOpenDialog = (user) => {
    setSelectedUser(user);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedUser({ ...selectedUser, [name]: value });
  };

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filtered = users.filter(user =>
      user.name.toLowerCase().includes(term.toLowerCase()) ||
      user.email.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text('User Report', 14, 15);

    const tableColumn = ["Name", "Email", "Phone", "Gender", "GitHub"];
    const tableRows = [];

    filteredUsers.forEach(user => {
      const userData = [
        user.name,
        user.email,
        user.phone,
        user.gender,
        user.github
      ];
      tableRows.push(userData);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save('user_report.pdf');
  };

  return (
    <div style={{ padding: '24px' }}>
      <h1>User Management</h1>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
        <TextField
          label="Search by name or email"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearch}
          style={{ width: '300px' }}
        />

        <Button
          variant="contained"
          color="success"
          onClick={generatePDF}
        >
          Generate PDF
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Email</strong></TableCell>
              <TableCell><strong>Phone</strong></TableCell>
              <TableCell><strong>Gender</strong></TableCell>
              <TableCell><strong>GitHub</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map(user => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.gender}</TableCell>
                <TableCell>{user.github}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleOpenDialog(user)}
                    variant="outlined"
                    color="primary"
                  >
                    Update
                  </Button>
                  <Button
                    onClick={() => handleDelete(user.id)}
                    variant="outlined"
                    color="secondary"
                    style={{ marginLeft: '10px' }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {filteredUsers.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

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
          <Button onClick={handleCloseDialog} color="primary">Cancel</Button>
          <Button onClick={handleUpdate} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserManagement;
