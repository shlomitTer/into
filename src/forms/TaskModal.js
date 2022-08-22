import React, { useState, useEffect } from 'react';
import Backdrop from '@mui/material/Backdrop';
import { Box, IconButton } from '@mui/material';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';

import TaskForm from './taskForm';
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


export default function TaskModal(props) {

  const [open, setOpen] = useState(false);

  // const handleOpen = () => setOpen(true);

  useEffect(() => {
    if (props.isCreationMode || props.isEditMode)
      setOpen(true)
  }, [props])



  const handleClose = () => {
    props.setIsEditMode(false)
    props.setIsCreationMode(false)
    setOpen(false);
  }

  return (
    <div>


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
            <TaskForm
              task={props?.task}
              handleClose={handleClose}
              isCreationMode={props.isCreationMode}
              isEditMode={props.isEditMode}

            />
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
