import React from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { colors } from '../../theme/theme';



export default function ProgressBar() {
  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.mode === 'light' ? colors.palette.secondary.main : '#308fe8',
    },
  }));

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* <FacebookCircularProgress />
    <br /> */}
      <BorderLinearProgress variant="determinate" value={50} />
    </Box>)
}

