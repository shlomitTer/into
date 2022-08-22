import React, { useState, useEffect } from 'react';
import Backdrop from '@mui/material/Backdrop';
import { Box, IconButton } from '@mui/material';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';

import EventForm from './eventForm';
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


export default function EventModal(props) {

  const [open, setOpen] = useState(false);


  useEffect(() => {
    if (props.isCreationModeEvent || props.isEditModeEvent)
      setOpen(true)
  }, [props])



  const handleClose = () => {
    props.setIsEditModeEvent(false)
    props.setIsCreationModeEvent(false)
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
            <EventForm
              event={props?.event}
              handleClose={handleClose}
              isCreationModeEvent={props.isCreationModeEvent}
              isEditModeEvent={props.isEditModeEvent}

            />
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
