import React from 'react'
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import UpdateIcon from '@mui/icons-material/Update';
import { Grid, Box } from '@mui/material';


export default function Count() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        textAlign: 'center'
      }}>
      {/* events */}

      <Box
        sx={{
          width: '20%',
          px: 8,
          py: 4,
          mx: 4,
          // borderRadius: 5,
          boxShadow: 1
        }}>
        <UpdateIcon fontSize='large' color='secondary' />

        <h5 style={{ paddingTop: '20px' }}>5 Event</h5>
      </Box>


      {/* Tasks */}

      <Box
        sx={{
          width: '20%',
          px: 8,
          py: 4,
          mx: 4,
          // borderRadius: 5,
          boxShadow: 1
        }}>
        <AssignmentTurnedInIcon fontSize='large' color='secondary' />


        <h5 style={{ paddingTop: '20px' }}>5 Tasks</h5>
      </Box>
    </Box>
  )
}
