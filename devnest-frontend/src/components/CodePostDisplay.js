import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism';  // Use prism theme

const CodePostDisplay = ({ code, language }) => {
  return (
    <div>
      <SyntaxHighlighter language={language} style={prism}>
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodePostDisplay;
