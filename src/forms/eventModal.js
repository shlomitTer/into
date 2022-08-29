import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import EventForm from './eventForm';


export default function EventModal(props) {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

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
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        fullWidth
        maxWidth='xs'
      >
        <div style={{ padding: '40px 30px' }}>
          <EventForm
            event={props?.event}
            handleClose={handleClose}
            isCreationModeEvent={props.isCreationModeEvent}
            isEditModeEvent={props.isEditModeEvent}

          />
        </div>
      </Dialog>
    </div>
  );
}
