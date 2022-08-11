import React, { useEffect } from 'react'
import Card from '@mui/material/Card';
import { Grid, Box, Divider, Checkbox } from '@mui/material';
import BasicRating from '../tasks/taskWeight'
import { Link } from 'react-router-dom';



export default function ToDos({ userTasks }) {
  // ----
  const [checked, setChecked] = React.useState([0]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };


  // -------



  useEffect(() => {

    console.log(userTasks)

  }, [userTasks])

  return (
    <Grid item xs={11} md={4} padding={2} marginX={"auto"} bgcolor={"#e9ecef"}>
      {/* <Grid container spacing={2}> */}
      <Grid container
        sx={{
          me: 7,
          mb: 2
        }}>
        <Grid item><h2> TO DO:</h2></Grid>
      </Grid>
      {userTasks && userTasks.map(task => (
        <Box variant="outlined" sx={{
          m: 2,
          p: 2,
          display: 'flex',
          justifyContent: 'space-around',
          transition: "transform 0.15s ease-in-out",
          '&:hover': {
            transform: "scale3d(1.01, 1.01, 1.01)",
          },
        }} key={task._id}>
          {/* ----- */}
          <Box sx={{ width: '10%' }}>
            <Checkbox />
          </Box>
          {/* ---------- */}
          <Box sx={{ width: '75%' }}>
            <Link to={`/task/${task._id}`} style={{
              textDecoration: "none",
              color: 'black'
            }}>


              <h4 > {task.title}</h4>
              <h5 > date:{task.date}</h5>
              <p>created by: {task.user_id.name}</p>
              <BasicRating />
              <Divider />
            </Link>
          </Box>
        </Box>
      ))
      }
    </Grid >




  )
}
