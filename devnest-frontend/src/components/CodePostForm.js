import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { TextField, Button, Box, FormControl, MenuItem, Select, InputLabel, Card, Typography, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import { toast } from 'react-toastify';  // Import toast for notifications
import 'react-toastify/dist/ReactToastify.css';  // Import the CSS for Toast

// Styling the form container with improved width and spacing
const FormContainer = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(5), // Increased padding for more space
  gap: theme.spacing(3), // Increased gap between form elements
  margin: 'auto',
  boxShadow: theme.shadows[10],  // Added stronger box shadow
  textAlign: 'center',
  borderRadius: '16px', // Rounded corners for a modern look
  [theme.breakpoints.up('sm')]: {
    width: '500px',  // Slightly wider on larger screens (md breakpoint)
  },
  [theme.breakpoints.up('md')]: {
    width: '600px',  // Increase width further on large screens (lg breakpoint)
  },
  [theme.breakpoints.up('lg')]: {
    width: '650px',  // Maximum width for very large screens
  },
  backgroundColor: '#fff',
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  fontWeight: 'bold',
  fontSize: '1.8rem',
  color: theme.palette.primary.main,
}));

const CodePostForm = () => {
  const { id } = useParams();  // Get the code post ID from the URL
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('');

  // Fetch post details for editing if id is present
  useEffect(() => {
    if (id) {
      // If an ID is passed, fetch the code post details
      axios.get(`http://localhost:8080/api/codeposts/${id}`)
        .then(response => {
          const post = response.data;
          setTitle(post.title);
          setDescription(post.description);
          setCode(post.code);
          setLanguage(post.language);
        })
        .catch(error => console.error('Error fetching code post', error));
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const postData = { title, description, code, language };

    const request = id
      ? axios.put(`http://localhost:8080/api/codeposts/${id}`, postData)  // Update request
      : axios.post('http://localhost:8080/api/codeposts', postData);  // Create request

    request.then(() => {
      // Show success toast
      toast.success('Code post saved successfully!');
      // Reset the form after submission
      setTitle('');
      setDescription('');
      setCode('');
      setLanguage('');
    }).catch(error => {
      // Show error toast in case of failure
      console.error('Error saving code post', error);
      toast.error('Error saving code post!');
    });
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', padding: 2 }}>
      <FormContainer>
        <Typography variant="h4" gutterBottom sx={{ color: '#1976d2' }}>
          {id ? 'Edit Code Post' : 'Add Code Post'}  {/* Title dynamically changes */}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* Title */}
          <TextField
            label="Title"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}  // Make sure state is updating correctly
            required
            fullWidth
            sx={{ backgroundColor: '#f9f9f9', borderRadius: '8px' }}  // Lighter background for input
          />

          {/* Description */}
          <TextField
            label="Description"
            variant="outlined"
            value={description}
            onChange={(e) => setDescription(e.target.value)}  // State updates on each keystroke
            required
            multiline
            rows={4}
            fullWidth
            sx={{ backgroundColor: '#f9f9f9', borderRadius: '8px' }}  // Lighter background for input
          />

          {/* Code */}
          <TextField
            label="Code"
            variant="outlined"
            value={code}
            onChange={(e) => setCode(e.target.value)}  // State updates on each keystroke
            required
            multiline
            rows={6}
            fullWidth
            sx={{ backgroundColor: '#f9f9f9', borderRadius: '8px' }}  // Lighter background for input
          />

          {/* Programming Language */}
          <FormControl fullWidth sx={{ backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
            <InputLabel>Programming Language</InputLabel>
            <Select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              required
            >
              <MenuItem value="JavaScript">JavaScript</MenuItem>
              <MenuItem value="Python">Python</MenuItem>
              <MenuItem value="Java">Java</MenuItem>
              <MenuItem value="C++">C++</MenuItem>
              <MenuItem value="C#">C#</MenuItem>
              <MenuItem value="Ruby">Ruby</MenuItem>
              <MenuItem value="Go">Go</MenuItem>
              <MenuItem value="Swift">Swift</MenuItem>
              <MenuItem value="PHP">PHP</MenuItem>
              <MenuItem value="HTML/CSS">HTML/CSS</MenuItem>
              <MenuItem value="TypeScript">TypeScript</MenuItem>
              <MenuItem value="SQL">SQL</MenuItem>
              <MenuItem value="Kotlin">Kotlin</MenuItem>
              <MenuItem value="R">R</MenuItem>
              <MenuItem value="Rust">Rust</MenuItem>
              <MenuItem value="MATLAB">MATLAB</MenuItem>
              <MenuItem value="Shell">Shell</MenuItem>
              <MenuItem value="Dart">Dart</MenuItem>
            </Select>
          </FormControl>

          {/* Submit Button */}
          <Button type="submit" variant="contained" sx={{ marginTop: 3, backgroundColor: '#1976d2' }}>
            Save Post
          </Button>
        </Box>

        <Divider sx={{ marginTop: 2 }} />
        <Typography variant="body2" sx={{ textAlign: 'center', marginTop: 2, color: '#1976d2' }}>
          Need help? Check out our <a href="/help" style={{ textDecoration: 'none', color: '#1976d2' }}>Help Center</a>
        </Typography>
      </FormContainer>
    </Box>
  );
};

export default CodePostForm;
