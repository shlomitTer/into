import React from 'react'
import { Grid, IconButton, Typography, Box, Divider } from '@mui/material'
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

export default function TasksBoard({ tasks }) {
  console.log(tasks);
  return (
    <Grid item sx={{ paddingTop: 5 }}>
      <Typography variant='h5'>Tasks<IconButton><AddBoxOutlinedIcon /></IconButton></Typography>
      {tasks && tasks.map(task => (
        <Grid item
          sx={{
            bgcolor: 'white',
            my: 2,
            display: 'flex',
            flexWrap: 'wrap',
            padding: 2,
            boxShadow: 1,
            borderRadius: 2
          }}>
          <Grid item xs={2}><AddBoxOutlinedIcon /></Grid>
          <Grid item xs={8}>
            <Typography variant='h6'>{task.title}</Typography>
            <Typography variant='body1'>{task.description}</Typography>
            <Grid item>
              <Typography>{task.date}</Typography>
              <Divider orientation="vertical" variant="middle" flexItem />
              <Typography sx={{ pt: 1, display: 'inline' }}>{task.user_id.name}</Typography>
              <Divider orientation="vertical" variant="middle" flexItem />

              {/* לשנות את המודל לאדם אחד למשימה ולשנות פה לאחראי ולא ליוצר */}
              <AccessTimeIcon sx={{ display: 'inline', fontSize: 36 }} />
              <Typography variant="body1" sx={{ pt: 1, display: 'inline' }}>23 Days left</Typography>
            </Grid>
          </Grid>

        </Grid>
      ))
      }

    </Grid >

  )
}
