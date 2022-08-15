import React, { useState } from 'react'
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



export default function Try() {
  const [errors, setErrors] = useState({});

  const initialFormState = {
    firstname: "",
    lastname: "",
    username: "",
    contactnumber: "",
    password: "",
    confirmPass: ""
  };
  const [registration, setRegistration] = useState(initialFormState);

  const validate = () => {
    let temp = { ...errors };

    if ("firstname" in registration)
      temp.firstname = registration.firstname ? "" : "This field is required.";
    if ("lastname" in registration)
      temp.lastname = registration.lastname ? "" : "This field is required.";
    if ("username" in registration)
      temp.username = /$^|.+@.+..+/.test(registration.username)
        ? ""
        : "Email is not valid.";
    if ("contactnumber" in registration)
      temp.contactnumber =
        registration.contactnumber.length > 6
          ? ""
          : "Minimum 6 numbers required.";
    if ("password" in registration)
      temp.password =

        registration.password.length != 0 ? "" : "This field is required.";
    setErrors({
      ...temp
    });

    if (registration) return Object.values(temp).every((x) => x == "");
  };

  const handleChange = (e) => {
    console.log(errors);
    setRegistration({ ...registration, [e.target.name]: e.target.value });
    validate()
    console.log(registration);
  };
  return (
    <div>
      <TextField
        variant="outlined"
        margin="normal"
        id="contactnumber"
        label="contactnumber"
        style={{ margin: 8 }}
        fullWidth
        name="contactnumber"
        value={registration.contactnumber}
        onChange={handleChange}
        error={errors.contactnumber}
        helperText={errors.contactnumber}
      />
    </div>
  );
}
