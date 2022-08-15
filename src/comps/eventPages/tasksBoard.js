import React from 'react'
import { Grid, IconButton, Typography, Box, Divider, AvatarGroup, Avatar } from '@mui/material'
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Container } from '@mui/system';
import { stringAvatar } from '../../features/functions/avatarStringColor'
import { shorten_a_string } from '../../features/functions/string'
import ProgressBar from './progressBar';

export default function TasksBoard({ tasks }) {
  console.log(tasks);
  return (
    <Grid item sx={{ paddingTop: 5 }}>

      <Grid item>
        <Typography variant='h5'>Tasks
          <IconButton>
            <AddBoxOutlinedIcon /></IconButton>
        </Typography>
      </Grid>

      <Grid item
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          justifyItems: 'center',

        }}>
        {tasks && tasks.map(task => (
          <Box
            sx={{
              width: '32%',
              height: '250px',
              bgcolor: 'white',
              p: 2,
              mb: 2,
              boxShadow: 1,
              borderRadius: 2,
              justifyContent: 'space-between',
              justifyItems: 'center',
            }}>
            <Grid item sx={{
              display: 'flex',
              flexWrap: 'center'
            }}>
              <Grid item xs={8}>
                <Typography variant='h6' >{task.title}</Typography>
              </Grid>

              <Grid item xs={4} textAlign={'center'} sx={{ pt: 1 }}>
                <AccessTimeIcon />
                <Typography component={'p'} fontSize={'12px'}>23 Days left</Typography>
              </Grid>
            </Grid>

            <Grid item sx={{
              height: '125px'
            }}>
              <Typography variant='body1'>{task.description} hh</Typography>
            </Grid>
            <Grid item sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyItems: 'center',
            }}>
              <Grid item xs={3}>

                <AvatarGroup max={1}>
                  {task.usersId_arr && task.usersId_arr.map(user => (

                    <Avatar key={user._id} {...stringAvatar(user?.name)} ></Avatar>
                  ))}
                </AvatarGroup>
              </Grid>

              <Grid item xs={8} sx={{ my: 'auto' }}>
                <ProgressBar />
              </Grid>

            </Grid>
          </Box>
        ))
        }

      </Grid >
    </Grid >
  )
}
