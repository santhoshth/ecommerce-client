import React from "react";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Loading = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: "50px", marginBottom: "50px" }}>
      <CircularProgress color="inherit" />
    </Box>
  );
};

export default Loading;
