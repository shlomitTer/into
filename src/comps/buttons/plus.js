import React from 'react';
import { Modal, IconButton, Tooltip } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CreateEvent from "../events/createEvent"

export default function Plus() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (

    <div>
      <IconButton onClick={handleOpen}>
        <AddCircleIcon />
      </IconButton >
      <Tooltip>
        <Modal
          sx={{
            background: '#fffdf9',
          }}
          children
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">

          <CreateEvent />

        </Modal>
      </Tooltip>
    </div >

  );
}
