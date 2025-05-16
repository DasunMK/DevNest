import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack
} from '@mui/material';
import { toast } from 'react-toastify';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const AllCodePosts = () => {
  const [codePosts, setCodePosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    fetchCodePosts();
  }, []);

  const fetchCodePosts = () => {
    axios.get('http://localhost:8080/api/codeposts')
      .then((response) => {
        setCodePosts(response.data);
        setFilteredPosts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching code posts:', error);
        toast.error('Error fetching code posts');
      });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8080/api/codeposts/${id}`)
      .then(() => {
        const updated = codePosts.filter((post) => post.id !== id);
        setCodePosts(updated);
        setFilteredPosts(updated);
        toast.success('Code post deleted successfully!');
      })
      .catch((error) => {
        console.error('Error deleting code post:', error);
        toast.error('Error deleting code post');
      });
  };

  const handleUpdate = () => {
    axios.put(`http://localhost:8080/api/codeposts/${selectedPost.id}`, selectedPost)
      .then(() => {
        const updated = codePosts.map((post) =>
          post.id === selectedPost.id ? selectedPost : post
        );
        setCodePosts(updated);
        setFilteredPosts(updated);
        setOpenDialog(false);
        toast.success('Code post updated successfully!');
      })
      .catch((error) => {
        console.error('Error updating code post:', error);
        toast.error('Error updating code post');
      });
  };

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    const filtered = codePosts.filter((post) =>
      post.title.toLowerCase().includes(value.toLowerCase()) ||
      post.description.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredPosts(filtered);
  };

  const handleOpenDialog = (post) => {
    setSelectedPost(post);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedPost({ ...selectedPost, [name]: value });
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Code Posts Report', 14, 22);

    const tableColumn = ["Title", "Description", "Language"];
    const tableRows = [];

    filteredPosts.forEach(post => {
      tableRows.push([
        post.title || '',
        post.description || '',
        post.language || ''
      ]);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 30,
      theme: 'striped',
      headStyles: {
        fillColor: [63, 81, 181],
        textColor: 255,
        fontStyle: 'bold'
      },
      styles: {
        fontSize: 10,
        cellPadding: 3
      },
      margin: { top: 10 },
    });

    doc.save('code_posts_report.pdf');
  };

  return (
    <Box p={9}>
      <Typography variant="h3" gutterBottom sx={{ textAlign: 'center' }}>
        All Code Posts
      </Typography>

      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <TextField
          label="Search Code Posts"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearch}
          sx={{ width: '300px' }}
        />
        <Button
          variant="contained"
          color="secondary"
          onClick={generatePDF}
        >
          Generate Report
        </Button>
      </Box>

      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell><strong>Title</strong></TableCell>
              <TableCell><strong>Description</strong></TableCell>
              <TableCell><strong>Language</strong></TableCell>
              <TableCell align="center"><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPosts.map((post) => (
              <TableRow key={post.id} hover>
                <TableCell>{post.title}</TableCell>
                <TableCell>{post.description}</TableCell>
                <TableCell>{post.language}</TableCell>
                <TableCell align="center">
                  <Stack direction="row" spacing={1} justifyContent="center">
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => handleOpenDialog(post)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={() => handleDelete(post.id)}
                    >
                      Delete
                    </Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle>Update Code Post</DialogTitle>
        <DialogContent>
          {selectedPost && (
            <Box mt={2}>
              <TextField
                label="Title"
                name="title"
                value={selectedPost.title}
                onChange={handleInputChange}
                fullWidth
                margin="dense"
              />
              <TextField
                label="Description"
                name="description"
                value={selectedPost.description}
                onChange={handleInputChange}
                fullWidth
                margin="dense"
              />
              <TextField
                label="Language"
                name="language"
                value={selectedPost.language}
                onChange={handleInputChange}
                fullWidth
                margin="dense"
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleUpdate} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AllCodePosts;
