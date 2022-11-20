import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import TaskForm from './taskForm';

export default function TaskModal(props) {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    if (props.isCreationMode || props.isEditMode)
      setOpen(true)
  }, [props.isCreationMode, props.isEditMode])

  const handleClose = () => {
    if (props.isEditMode)
      props.setIsEditMode(false)
    else
      props.setIsCreationMode(false)
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
          <TaskForm
            task={props?.task}

            isCreationMode={props.isCreationMode}
            isEditMode={props.isEditMode}
            setIsCreationMode={props.setIsCreationMode}
            setIsEditMode={props.setIsEditMode}
            setOpen={setOpen}
          />
        </div>
      </Dialog>
    </div>
  );
}
