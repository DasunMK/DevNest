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
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Fetch users from backend
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios.get('http://localhost:8080/api/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
        toast.error('Error fetching users');
      });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8080/api/users/${id}`)
      .then(() => {
        setUsers(users.filter(user => user.id !== id));
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
        setUsers(users.map(user => user.id === selectedUser.id ? selectedUser : user));
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

  // PDF generation function
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text('User Report', 14, 15);

    const tableColumn = ["Name", "Email", "Phone", "Gender", "GitHub"];
    const tableRows = [];

    users.forEach(user => {
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
    <div>
      <h1>User Management</h1>

      <Button
        variant="contained"
        color="success"
        onClick={generatePDF}
        style={{ marginBottom: '15px' }}
      >
        Export as PDF
      </Button>

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
          </TableBody>
        </Table>
      </TableContainer>

      {/* Update Dialog */}
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
