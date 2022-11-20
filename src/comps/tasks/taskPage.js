import { Box, Button, Divider, IconButton, Paper, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { editTask, getCurrentTask, setIsTaskPageOpen, setTask_id, setCurrentTask } from '../../features/slices/tasksSlice';
import { countDays } from '../../features/functions/countDays';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';

import './taskPage.css'
export default function TaskPage(props) {
  const [date, setDate] = useState('00/00/00')
  const [days, setDays] = useState('')
  const [listItemsArray, setListItemsArray] = useState([]);
  const [list, setList] = useState(false);
  const [isLast, setIsLast] = useState(false);
  const { currentTask, isTaskPageOpen, task_id } = useSelector((state) => state.tasksReducer);
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  useEffect(() => {
    dispatch(getCurrentTask(task_id))
  }, [task_id])


  useEffect(() => {
    let _date = new Date(currentTask?.date).toLocaleDateString()
    setDate(_date)
    setDays(countDays(currentTask?.date))
    if (Array.isArray(currentTask.listItems)) {
      setListItemsArray([...currentTask.listItems])
    }
  }, [currentTask])



  useEffect(() => {
    if (listItemsArray.length > 0)
      setList(true)
    else if ((listItemsArray.length === 0 || !listItemsArray) && !isLast)
      setList(false)
  }, [listItemsArray])

  useEffect(() => {
    return () => {
      setListItemsArray([])
      setList(false)//
      dispatch(setIsTaskPageOpen(false))
      dispatch(setTask_id(""))
      dispatch(setCurrentTask())
      setIsLast(false)
    }
  }, [])


  const handleSubmit = () => {
    let obj = { name: inputRef.current.value, isComplited: false }
    setListItemsArray([...listItemsArray, obj])
    inputRef.current.value = ""
  };

  const handleCheck = (i) => {
    let itemsArray = [...listItemsArray]
    let obj = { ...itemsArray[i] };
    obj.isComplited = !obj.isComplited;
    itemsArray.splice(i, 1, obj);
    setListItemsArray(itemsArray)
  };

  const handleSaveChanges = () => {
    let task = {
      title: currentTask.title,
      description: currentTask.description,
      date: currentTask.date,
      time: currentTask.time,
      location: currentTask.location,
      listItems: listItemsArray
    };
    dispatch(editTask({ _id: currentTask._id, _body: task }))
    setIsLast(false)
  }

  const handleRemove = (id) => {
    let itemsArray = [...listItemsArray]
    if (itemsArray.length === 1)
      setIsLast(true)
    itemsArray = [...itemsArray.filter((obj) => obj._id != id)]
    setListItemsArray(itemsArray)
  };

  const handleClose = (e) => {
    e.stopPropagation()
    dispatch(setIsTaskPageOpen(!isTaskPageOpen));
    dispatch(setTask_id(""));
    setList(false)
  }
  return (
    <div className={isTaskPageOpen ? "pop_up" : "closePop_up"}>
      <IconButton onClick={handleClose} >
        <KeyboardArrowRightOutlinedIcon fontSize="small" />
      </IconButton>
      <Box>
        <Typography variant='h5' sx={{ fontWeight: 700, pt: 0 }}>{currentTask?.title}</Typography>
      </Box>
      <Box>
        <Typography variant='body2' sx={{ fontWeight: 700, pt: 1, color: "gray" }}>created by: {currentTask?.user_id?.name}</Typography>
      </Box>
      <Box >
        <Typography variant="h6" sx={{ wordBreak: 'break-word' }}>{currentTask?.description}</Typography>
      </Box>


      <Box>
        <Typography variant="h6" sx={{ paddingRight: 5, fontWeight: 700 }}>{date}</Typography>
      </Box>

      <Box sx={{ textAlign: 'center' }} >
        {/* <AccessTimeIcon fontSize="medium" /> */}
        <Typography variant="body2" sx={{ pt: 1 }} color={days.color}>{days.str} </Typography>
      </Box>
      {(listItemsArray.length == 0 || !listItemsArray) && !list && <Box>
        <Button variant="outlined" onClick={() => {
          setList(true)
        }} startIcon={<FormatListBulletedOutlinedIcon />}>
          Add List
        </Button>
      </Box>
      }
      {(listItemsArray.length || list) && <Box>
        <Paper
          sx={{ display: 'flex', alignItems: 'center', width: 350, my: 2 }}>
          <input ref={inputRef} style={{ border: 0, boxShadow: 'none' }} placeholder="add item" className='_fullWidthInput' onKeyDown={(e) => {
            if (e.key == 'Enter')
              handleSubmit()
          }} />
          <Divider orientation="vertical" />
          <Button onClick={handleSubmit}>add</Button>
        </Paper>
        {(listItemsArray.length || list) && <div className='scrolled'>{

          listItemsArray.map((obj, i) => (
            <div key={obj._id} className='_li'>
              <input type="checkbox" value={obj.name} onChange={() => handleCheck(i)} defaultChecked={obj.isComplited} />
              <p className={"_label"}> {obj.name}</p>
              <IconButton className='_delete' onClick={() => {
                handleRemove(obj._id)
              }}>
                <ClearOutlinedIcon fontSize='small' />
              </IconButton>
            </div>

          ))}
        </div>
        }
        <Button variant='outlined' onClick={handleSaveChanges} sx={{ mt: 4 }}>save changes</Button>
      </Box>
      }
    </div>
  )
}
