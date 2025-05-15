import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { TextField, Button, Box, FormControl, MenuItem, Select, InputLabel, Card, Typography, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import { toast } from 'react-toastify';  // Import toast for notifications
import 'react-toastify/dist/ReactToastify.css';  // Import the CSS for Toast

// Styling the form container similar to Register.js page
const FormContainer = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(9), // Adjust this padding to increase overall space
  gap: theme.spacing(2),
  margin: 'auto',
  boxShadow: 'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
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
    <FormContainer sx={{ marginTop: 4 }}> {/* Added space from the top of the container */}
      <Typography variant="h4" gutterBottom>
        Add Code Post
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {/* Title */}
        <TextField
          label="Title"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}  // Make sure state is updating correctly
          required
          fullWidth
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
        />

        {/* Programming Language */}
        <FormControl fullWidth>
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
        <Button type="submit" variant="contained" sx={{ marginTop: 2 }}>
          Save Code Post
        </Button>
      </Box>

      <Divider sx={{ marginTop: 2 }} />
      <Typography variant="body2" sx={{ textAlign: 'center', marginTop: 1 }}>
        Need help? Check out our <a href="/help">Help Center</a>
      </Typography>
    </FormContainer>
  );
};

export default CodePostForm;
