// src/components/CodePostComments.js

import React, { useState } from 'react';
import axios from 'axios';

const CodePostComments = ({ postId }) => {
  const [comment, setComment] = useState('');

  const handleCommentSubmit = async () => {
    try {
      await axios.post(`http://localhost:8080/api/codeposts/${postId}/comments`, { comment });
      alert('Comment added');
    } catch (error) {
      console.error('Error adding comment', error);
      alert('Error adding comment');
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Add a comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button onClick={handleCommentSubmit}>Submit</button>
    </div>
  );
};

export default CodePostComments;
