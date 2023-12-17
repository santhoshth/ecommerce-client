import React from 'react';
import '../styles/Error.css';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

function Error({ error }) {
  return (
    <div className="error">
      <div className="error__icon">
        <ErrorOutlineIcon />
      </div>
      <div className="error__content">
        <span>There was a problem</span>
        <p>{error}</p>
      </div>
    </div>
  )
}

export default Error;