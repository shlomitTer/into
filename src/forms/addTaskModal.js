import React, { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import { Box, IconButton } from '@mui/material';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddTaskForm from './addTaskForm';

import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


export default function AddTaskModal() {

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <IconButton onClick={handleOpen}>
        <AddBoxOutlinedIcon />
      </IconButton>


      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <AddTaskForm handleClose={handleClose} />
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
