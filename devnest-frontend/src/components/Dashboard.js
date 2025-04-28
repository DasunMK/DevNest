// src/components/Dashboard.js
import React from 'react';
import { Box, Grid, Card, CardContent, Typography, Button, Avatar } from '@mui/material';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';

// Styled Components for Layout
const DashboardContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  fontWeight: 'bold',
  fontSize: '1.5rem',
}));

const CardStyled = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: theme.spacing(2),
  boxShadow: theme.shadows[3],
  textAlign: 'center',
  marginBottom: theme.spacing(3),
}));

const AvatarStyled = styled(Avatar)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  width: theme.spacing(10),
  height: theme.spacing(10),
  margin: 'auto',
}));

// Dummy Data for Testing
const user = {
  name: 'Dasun Madusanka',
  email: 'madusankedasun@gmail.com',
  profileImage: 'https://www.w3schools.com/w3images/avatar2.png',
};

const courses = [
  { title: 'JavaScript Basics', progress: '75%' },
  { title: 'React Fundamentals', progress: '60%' },
  { title: 'Advanced Python', progress: '40%' },
];

const Dashboard = () => {
  return (
    <DashboardContainer>
      {/* Profile Section */}
      <Grid container justifyContent="center">
        <Grid item xs={12} md={4}>
          <CardStyled>
            <AvatarStyled src={user.profileImage} alt={user.name} />
            <Typography variant="h6">{user.name}</Typography>
            <Typography variant="body2">{user.email}</Typography>
            <Button variant="contained" color="primary" fullWidth sx={{ marginTop: 2 }}>
              Edit Profile
            </Button>
          </CardStyled>
        </Grid>
      </Grid>

      {/* Courses Progress Section */}
      <SectionTitle>Your Courses</SectionTitle>
      <Grid container spacing={3} justifyContent="center">
        {courses.map((course, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <CardStyled>
              <CardContent>
                <Typography variant="h6">{course.title}</Typography>
                <Typography variant="body2" color="textSecondary">
                  Progress: {course.progress}
                </Typography>
              </CardContent>
              <Button variant="outlined" color="primary" fullWidth>
                Continue
              </Button>
            </CardStyled>
          </Grid>
        ))}
      </Grid>

      {/* Dashboard Navigation Links */}
      <Grid container justifyContent="center" sx={{ marginTop: 5 }}>
        <Grid item xs={12} sm={6} md={4}>
          <CardStyled>
            <CardContent>
              <Typography variant="h6">Upcoming Challenges</Typography>
              <Button variant="outlined" color="primary" fullWidth component={Link} to="/challenges">
                View Challenges
              </Button>
            </CardContent>
          </CardStyled>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <CardStyled>
            <CardContent>
              <Typography variant="h6">My Submissions</Typography>
              <Button variant="outlined" color="primary" fullWidth component={Link} to="/submissions">
                View Submissions
              </Button>
            </CardContent>
          </CardStyled>
        </Grid>
      </Grid>
    </DashboardContainer>
  );
};

export default Dashboard;
