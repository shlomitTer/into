import React, { useState, useEffect } from 'react';
import Backdrop from '@mui/material/Backdrop';
import { Box, IconButton } from '@mui/material';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';

import EventForm from './eventForm';
import DeletionAlert from './deletionAlert';
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


export default function MessagesModal(props) {

  const [open, setOpen] = useState(false);


  useEffect(() => {
    if (props.deleteItem)
      setOpen(true)
    console.log(open);
    console.log(props.deleteItem);
  }, [props])



  const handleClose = () => {
    props.setDeleteItem(false)
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
            <DeletionAlert
              deleteItem={props.deleteItem}
              setDeleteItem={props.setDeleteItem}
              handleClose={handleClose}
              event={props.event}
            />
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
