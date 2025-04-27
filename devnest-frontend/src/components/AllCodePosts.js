import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const AllCodePosts = () => {
  const [codePosts, setCodePosts] = useState([]);

  useEffect(() => {
    // Fetch all code posts from the API
    axios.get('http://localhost:8080/api/codeposts')
      .then(response => {
        setCodePosts(response.data);  // Store code posts in state
      })
      .catch(error => {
        console.error('Error fetching code posts', error);
      });
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/codeposts/${id}`);
      setCodePosts(codePosts.filter(post => post.id !== id)); // Remove the deleted post from the state
      alert('Code post deleted successfully!');
    } catch (error) {
      console.error('Error deleting post', error);
      alert('Error deleting post');
    }
  };

  const handleUpdate = (id) => {
    // Redirect or show the update form (this can be customized)
    window.location.href = `/codepost/update/${id}`; // Assuming a route for updating code posts
  };

  return (
    <div>
      <h2>All Code Posts</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Language</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {codePosts.map((post) => (
              <TableRow key={post.id}>
                <TableCell>{post.title}</TableCell>
                <TableCell>{post.description}</TableCell>
                <TableCell>{post.language}</TableCell>
                <TableCell>
                  {/* Update and Delete buttons */}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleUpdate(post.id)}
                    sx={{ marginRight: 1 }}
                  >
                    Update
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDelete(post.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AllCodePosts;
