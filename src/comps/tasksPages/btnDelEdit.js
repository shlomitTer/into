import React, { useState } from 'react'
import { useSelector, useDispatch } from "react-redux";

import Stack from '@mui/material/Stack';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { deleteTask } from '../../features/slices/tasksSlice';
import TaskModal from '../../forms/TaskModal';
// import EditTaskModal from '../../forms/editTaskModal';

export default function BtnDelEdit(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const _open = Boolean(anchorEl);
  const dispatch = useDispatch();
  console.log((props));

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };


  const handleClose = () => {
    setAnchorEl(null);
  };



  return (
    <Stack direction="row" spacing={0} textAlign='end' sx={{ display: 'flex', justifyContent: 'end' }}>
      <Tooltip title="Options">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={_open ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={_open ? 'true' : undefined}
        >
          <MoreVertIcon />
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={_open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            fontSize: 'small',
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={() => {
          props.setIsEditMode(true)
        }}>
          Edit
        </MenuItem>

        <TaskModal
          task={props.task}
          isCreationMode={props.isCreationMode}
          setIsCreationMode={props.setIsCreationMode}
          isEditMode={props.isEditMode}
          setIsEditMode={props.setIsEditMode}

        />

        <MenuItem onClick={() => {
          dispatch(deleteTask(props.task._id))
        }}>
          Remove
        </MenuItem>

      </Menu>

    </Stack >
  )
}
