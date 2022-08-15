import React, { useState } from 'react'
import { useSelector, useDispatch } from "react-redux";

// import { Box, TextField, InputAdornment } from '@mui/material';

// import { TextField, Button, Box, FormControl, FormHelperText, InputAdornment, OutlinedInput, InputAdornment } from "@mui/material";
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Button, Stack, Typography } from '@mui/material';
import { postNewTask } from '../features/slices/tasksSlice';
import { useParams } from 'react-router-dom';
import HoverRating from './rating';




export default function AddTaskForm({ handleClose }) {
  const dispatch = useDispatch();
  const params = useParams();

  const initialFormState = {
    title: '',
    description: '',
    date: '',
    time: '07:00',
    location: '',
    status: 'Ready',
    weight: 1,
    // listItems: [],
  };


  const [errors, setErrors] = useState({});
  const [registration, setRegistration] = useState(initialFormState);


  const validate = (_body) => {
    let temp = { ...errors };
    if ('title' in _body)
      temp.title = _body.title.length < 2 ? 'min 2 chars required' : " ";
    if ('description' in _body)
      temp.description = _body.description < 2 ? 'min 2 chars required' : " ";

    setErrors({
      ...temp,
    });

    // if (registration) return Object.values(temp).every((x) => x == '');
  };



  const handleChange = (e) => {
    console.log(e.target);
    setRegistration({ ...registration, [e.target.name]: e.target.value });
    console.log(registration);
    let validBody = { ...registration, [e.target.name]: e.target.value }
    validate(validBody)
    console.log(validBody);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let _dataBody = { ...registration }
    console.log("submit");

    const _id = params.idEvent;
    dispatch(postNewTask({ _dataBody, _id }))
    handleClose();
  }

  return (
    <Box >
      <Typography variant='h3'>New Task</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          required
          variant="standard"
          margin="normal"
          id="title"
          label="Title"
          name="title"
          value={registration.title}
          // error={errors.title}
          helperText={errors.title}
          onChange={handleChange}
          sx={{ m: 2 }}
        />
        <TextField
          fullWidth
          required
          multiline
          variant="standard"
          margin="normal"
          id="description"
          label="Description"
          name="description"
          value={registration.description}
          // error={errors.description}
          helperText={errors.description}
          onChange={handleChange}
          sx={{ m: 2 }}
        />

        {/* לסדר וואליו דיפולטיבי לתאריך אירוע */}
        <TextField
          fullWidth
          // label="Date"
          variant="standard"
          margin="normal"
          id="date"
          type="date"

          // defaultValue=""
          name="date"
          helperText={errors.date}
          onChange={handleChange}
          sx={{ m: 2 }}
        />
        <TextField
          fullWidth
          // label="Time"
          variant="standard"
          margin="normal"
          id="time"
          type="time"
          defaultValue="07:00"
          name="time"
          helperText={errors.time}
          onChange={handleChange}
          sx={{ m: 2 }}
        />
        <TextField
          fullWidth
          required
          multiline
          variant="standard"
          margin="normal"
          id="location"
          label="Location"
          name="location"
          value={registration.description}
          // error={errors.location}
          helperText={errors.location}
          onChange={handleChange}
          sx={{ m: 2 }}
        />

        <HoverRating handleChange />

        <Stack
          spacing={2}
          direction="row"
          justifyContent="end"
          alignItems="baseline"
        >
          <Button variant="text" onClick={handleClose}>Cancel</Button>

          <Button
            variant="text" type='submit'>Create</Button>
        </Stack>

      </form>

    </Box>
  )
}
