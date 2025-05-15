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
        setCodePosts(codePosts.filter((post) => post.id !== id));
        setFilteredPosts(filteredPosts.filter((post) => post.id !== id));
        toast.success('Code post deleted successfully!');
      })
      .catch((error) => {
        console.error('Error deleting code post:', error);
        toast.error('Error deleting code post');
      });
  };

  const handleUpdate = () => {
    axios.put(`/api/codeposts/${selectedPost.id}`, selectedPost)
      .then(() => {
        setCodePosts(codePosts.map((post) => (post.id === selectedPost.id ? selectedPost : post)));
        setFilteredPosts(filteredPosts.map((post) => (post.id === selectedPost.id ? selectedPost : post)));
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
    const filtered = codePosts.filter(post =>
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

    doc.setFontSize(20);
    doc.setTextColor(40);
    doc.text("All Code Posts Report", 14, 20);

    doc.setLineWidth(0.5);
    doc.line(14, 25, 200, 25);

    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text('Title', 14, 35);
    doc.text('Description', 60, 35);
    doc.text('Language', 140, 35);

    doc.setLineWidth(0.5);
    doc.line(14, 37, 200, 37);

    let y = 42;

    filteredPosts.forEach((post) => {
      doc.setFontSize(10);
      doc.text(post.title, 14, y);
      doc.text(post.description, 60, y);
      doc.text(post.language, 140, y);
      y += 8;
      doc.setLineWidth(0.2);
      doc.line(14, y, 200, y);
    });

    const pageCount = doc.internal.getNumberOfPages();
    doc.setFontSize(10);
    doc.setTextColor(150);
    doc.text(`Page ${doc.internal.getCurrentPageInfo().pageNumber} of ${pageCount}`, 14, doc.internal.pageSize.height - 10);

    doc.save('code_posts_report.pdf');
  };

  return (
    <Box p={9}>
      <Typography variant="h3" gutterBottom sx={{ textAlign: 'center' }}>
  All Code Posts
</Typography>


      <TextField
        label="Search Code Posts"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearch}
        sx={{ width: '300px', marginBottom: 2 }} // Reduced width for search box
      />

            <Button
        variant="contained"
        color="secondary"  // Changed button color to secondary
        onClick={generatePDF}
        sx={{ marginBottom: 2, display: 'flex', justifyContent: 'flex-end' }}
      >
        Report
      </Button>

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
