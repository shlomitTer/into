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
    if (props.isEditModeEvent)
      props.setIsEditModeEvent(false)
    else
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
            isCreationModeEvent={props?.isCreationModeEvent}
            setIsCreationModeEvent={props?.setIsCreationModeEvent}
            isEditModeEvent={props?.isEditModeEvent}
            setIsEditModeEvent={props?.setIsEditModeEvent}
            setOpen={setOpen}
          />
        </div>
      </Dialog>
    </div>
  );
}
