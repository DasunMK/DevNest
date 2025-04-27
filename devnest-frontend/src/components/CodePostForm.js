import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, FormControl, MenuItem, Select, InputLabel, Box, Card, Typography, Divider } from '@mui/material';  // Material UI imports
import { styled } from '@mui/material/styles';

const CodePostForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('');
  const [file, setFile] = useState(null);
  const [videoUrl, setVideoUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('code', code);
    formData.append('language', language);
    if (file) formData.append('file', file);
    if (videoUrl) formData.append('videoUrl', videoUrl);

    try {
      // Logging for debugging
      console.log('Form data being submitted:', formData);
      await axios.post('http://localhost:8080/api/codeposts', formData);
      console.log('Code post created successfully');
    } catch (error) {
      console.error('Error uploading code post', error);
      alert('Error uploading code post');
    }
  };

  const FormContainer = styled(Card)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: 'auto',
    boxShadow: 'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
    [theme.breakpoints.up('sm')]: {
      width: '450px',
    },
  }));

  return (
    <FormContainer>
      <Typography variant="h4" gutterBottom>
        Create a New Code Post
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Title"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          inputProps={{ maxLength: 100 }}  // Optional: Limit title length to 100 characters
        />
        <TextField
          label="Description"
          variant="outlined"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          multiline
          rows={4}
          inputProps={{ maxLength: 500 }}  // Optional: Limit description length to 500 characters
        />
        <TextField
          label="Code"
          variant="outlined"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
          multiline
          rows={6}
          inputProps={{ maxLength: 2000 }}  // Optional: Limit code length to 2000 characters
        />
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
            {/* Add more programming languages here */}
          </Select>
        </FormControl>
        <Button variant="contained" component="label" sx={{ marginBottom: 2 }}>
          Upload Code File
          <input type="file" hidden onChange={(e) => setFile(e.target.files[0])} />
        </Button>
        <TextField
          label="Video URL (optional)"
          variant="outlined"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          fullWidth
        />
        <Button type="submit" variant="contained" sx={{ marginTop: 2 }}>
          Upload Code
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
