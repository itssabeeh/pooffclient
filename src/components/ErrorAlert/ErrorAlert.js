import React from 'react';
import Alert from 'react-bootstrap/Alert';

const ErrorAlert = ({ children }) => {
  return (
    <div>
      <Alert variant="danger">
        <Alert.Heading>{children}</Alert.Heading>
      </Alert>
    </div>
  );
};

export default ErrorAlert;
