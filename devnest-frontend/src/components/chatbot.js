import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Stack } from '@mui/material';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { text: 'Hello! How can I assist you today?', isBot: true },
  ]);
  const [userInput, setUserInput] = useState('');

  const qa = {
  "hello": "Hi there! How can I assist you today?",
  "how are you": "I'm doing great, thanks for asking!",
  "what is your name": "I am your assistant bot here to help you with the platform.",
  "bye": "Goodbye! Have a nice day!",
  
  // User Account and Profile
  "how do I create an account": "To create an account, click on the 'Sign Up' button on the homepage and provide your email and password.",
  "how do I update my profile": "Go to your dashboard and click on 'Edit Profile' to update your name, email, and profile picture.",
  "forgot my password": "No worries! Click on the 'Forgot Password' link on the login page to reset your password.",
  
  // Code Posting and Management
  "how do I submit a code post": "To submit a code post, navigate to the 'Create Post' section from your dashboard, provide a title, description, and add your code.",
  "can I edit my code post": "Yes, you can edit any of your code posts by going to the post, and clicking on the 'Edit' button.",
  "how do I delete my code post": "To delete a code post, go to the post and click the 'Delete' button.",
  "how do I add a code snippet": "You can add a code snippet by simply pasting it in the code editor while creating a post and specifying the programming language.",
  
  // Code Sharing and Collaboration
  "how do I share my code": "Once you've posted your code, you can share the URL of the post with anyone to access it. You can also share the post via social media links.",
  "can I collaborate on a code post": "Yes! You can invite collaborators by sharing the post link with them. They can add comments or suggest edits.",
  "can others edit my code": "Only you can edit your own code posts. However, others can suggest changes through comments.",
  
  // Searching and Browsing Code
  "how do I search for code posts": "To search for code posts, use the search bar at the top of the page. You can search by title, tags, or language.",
  "how do I filter code posts by language": "Use the filter option on the side panel to select the programming language you're interested in. This will display code posts written in that language.",
  "can I sort the code posts": "Yes, you can sort code posts by popularity, newest, or by the number of likes and comments.",
  
  // Feedback and Help
  "how do I report an issue": "If you encounter any issues, you can report them by clicking the 'Help' button at the bottom of the page and selecting 'Report an Issue'.",
  "where can I find tutorials": "You can find tutorials under the 'Learn' section of the platform. These tutorials cover a variety of programming languages and concepts.",
  "how do I leave feedback": "To leave feedback, click on the 'Feedback' section in your profile or the footer of the website. We'd love to hear from you!",
  
  // Notifications and Updates
  "how do I enable notifications": "To enable notifications, go to your profile settings and select the 'Notifications' tab. You can choose to receive notifications for new posts and comments.",
  "how do I manage my notifications": "You can manage your notifications under 'Settings' > 'Notifications'. You can choose to mute specific notifications or disable them completely.",
  
  // Platform Features and Community
  "is there a community forum": "Yes, our platform has a community forum where users can discuss coding challenges, share resources, and ask questions.",
  "how do I join the community forum": "You can join the community forum by clicking on the 'Forum' link in the main menu. Create a post or comment on existing discussions.",
  "how do I contribute to open-source projects": "You can contribute to open-source projects listed on the platform by forking them, making changes, and submitting a pull request.",
  
  // Technical Support
  "how do I fix a syntax error": "Check the error message in the console or output section for hints. Syntax errors are often due to missing punctuation or incorrect code structure.",
  "how do I debug my code": "Use `console.log` statements to track variables and steps in your code. You can also use a debugger tool specific to your IDE or browser.",
  "what is version control": "Version control systems like Git help you track and manage changes in your codebase. You can use platforms like GitHub or GitLab for version control.",
  
  // Account Management
  "how do I log out": "You can log out by clicking on your profile icon in the top-right corner and selecting 'Logout'.",
  "can I delete my account": "If you wish to delete your account, please contact our support team via the 'Help' section in your profile settings.",
  
  // Other
  "can I use this platform for free": "Yes, the platform is free to use. However, there are some premium features available under the 'Pro' plan.",
  "what is the pro plan": "The Pro plan offers additional features such as unlimited code storage, priority support, and access to exclusive tutorials."
};


  const handleUserMessage = () => {
    if (userInput.trim()) {
      // Add user message to chat
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: userInput, isBot: false },
      ]);

      // Get bot's response based on hardcoded answers
      const response = qa[userInput.toLowerCase()] || "Sorry, I don't understand that.";
      
      // Add bot response to chat
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: response, isBot: true },
      ]);
    }
    setUserInput('');
  };

  return (
    <Box sx={{ width: '300px', padding: 2, border: '1px solid #ccc', borderRadius: '8px' }}>
      <Typography variant="h6" gutterBottom>Chatbot</Typography>

      <Box sx={{ maxHeight: '300px', overflowY: 'auto', marginBottom: 2, padding: '10px', border: '1px solid #ccc', borderRadius: '8px' }}>
        {messages.map((message, index) => (
          <Box key={index} sx={{ textAlign: message.isBot ? 'left' : 'right' }}>
            <Typography
              variant="body2"
              sx={{ backgroundColor: message.isBot ? '#f0f0f0' : '#1976d2', color: message.isBot ? '#000' : '#fff', padding: 1, borderRadius: '5px', maxWidth: '80%', margin: '5px auto' }}
            >
              {message.text}
            </Typography>
          </Box>
        ))}
      </Box>

      <Stack direction="row" spacing={2}>
        <TextField
          label="Ask a question"
          variant="outlined"
          fullWidth
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleUserMessage()}
        />
        <Button variant="contained" onClick={handleUserMessage}>Send</Button>
      </Stack>
    </Box>
  );
};

export default Chatbot;
