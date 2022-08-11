import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';

import Grid from '@mui/material/Grid';
import { Stack, Avatar, AvatarGroup, Chip, Divider, Box } from '@mui/material';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import PeopleIcon from '@mui/icons-material/People';
import ScheduleIcon from '@mui/icons-material/Schedule';

import ProgressBar from '../events/progressBar';
import { colors } from '../../theme/theme';
import Plus from '../buttons/plus';



export default function EventsX({ eventsByCreator, eventsByParticpant, users, tasks }) {

  // const ref = React.forwardRef();

  useEffect(() => {


  }, [eventsByCreator, eventsByParticpant]);



  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name) {
    console.log(name);

    let names = name.split(' ')
    let shortName = name.match(/\b(\w)/g) ? name.match(/\b(\w)/g).join('').toUpperCase() : '-';
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: shortName,
    };
  }



  return (
    <Grid item xs={11} md={7} padding={2} bgcolor={"#f8f9fa"}>
      <Grid container spacing={2}>
        <Grid item ><h2>EVENTS</h2></Grid>
        <Grid item><Plus sx={{ p: 5 }} /></Grid>
      </Grid>

      <Grid container
        sx={{
          display: 'flex',
          justifyContent: "flex-start",
          mt: 4,
          mb: 2
        }}>
        {eventsByCreator ? <Grid item xs={12}><h5>My events:</h5></Grid> : ""}
        {eventsByCreator && eventsByCreator.map(event => (

          <Grid item xs={11} md={5}
            sx={{
              boxShadow: 2,
              m: 1,
              p: 2,
              transition: "transform 0.15s ease-in-out",
              '&:hover': {
                transform: "scale3d(1.01, 1.01, 1.01)",
              },
            }} key={event._id} className="box_">


            <Link to={`/new/${event._id}`} style={{
              textDecoration: "none",
              color: 'black'
            }}>
              <Chip label="25 days left" icon={<ScheduleIcon />} color='secondary' display={'flex'} />
              <h3 > {event.title}</h3>
              <p>created by: {event.user_id.name}</p>
              <Stack >
                <AvatarGroup max={10} >
                  {event.usersId_arr && event.usersId_arr.map(user => (
                    <Avatar key={user._id} {...stringAvatar(user?.name)} ></Avatar>
                    //   <Avatar key={user._id} >{user.name}</Avatar>
                  ))
                  }
                </AvatarGroup>
              </Stack>

              <Grid container>
                <Grid item >
                  <AssignmentTurnedInIcon />
                </Grid>

                <Grid item >
                  <p>5 Tasks</p>
                </Grid>

              </Grid>

              <Grid container>
                <Grid item >
                  <PeopleIcon />
                </Grid>

                <Grid item >
                  <p>5 participants</p>
                </Grid>

              </Grid>
              <Divider textAlign="right"
                sx={{ m: 2 }}
              >
                50%
              </Divider>

              <ProgressBar />
            </Link>
          </Grid>


        ))}
      </Grid>

      <Grid container
        sx={{
          mt: 4,
          mb: 2
        }}>
        {eventsByParticpant ? <Grid item xs={12}><h5>More events:</h5></Grid> : ""}

        {eventsByParticpant && eventsByParticpant.map(event => (
          <Grid item xs={11} md={5}
            sx={{
              boxShadow: 2,
              m: 2,
              p: 2,
              transition: "transform 0.15s ease-in-out",
              '&:hover': {
                transform: "scale3d(1.01, 1.01, 1.01)",
              },
            }} key={event._id} className="box_">
            <Link to={`/event/${event._id}`} style={{
              textDecoration: "none",
              color: 'black'
            }}>
              <Chip label="25 days left" icon={<ScheduleIcon />} color='secondary' />
              <h3 > {event.title}</h3>
              <p>created by: {event.user_id.name}</p>
              <Stack >
                <AvatarGroup max={3} >
                  {event.usersId_arr && event.usersId_arr.map(user => (
                    // <Avatar key={user._id} {...stringAvatar(user.name.toString())} />
                    <Avatar key={user._id} >{user.name}</Avatar>
                  ))
                  }
                </AvatarGroup>
              </Stack>

              <Grid container>
                <Grid item >
                  <AssignmentTurnedInIcon />
                </Grid>

                <Grid item >
                  <p>5 Tasks</p>
                </Grid>

              </Grid>

              <Grid container>
                <Grid item >
                  <PeopleIcon />
                </Grid>

                <Grid item >
                  <p>5 members</p>
                </Grid>

              </Grid>
              <Divider textAlign="right"
                sx={{ m: 2 }}
              >
                50%
              </Divider>

              <ProgressBar />
            </Link>
          </Grid>


        ))}

      </Grid>
    </Grid >

  )
}
