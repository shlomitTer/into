import * as React from 'react';
import { useSelector, useDispatch } from "react-redux";

import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';

import { setTaskWeight } from '../features/slices/tasksSlice';

const labels = {
  1: 'Regular',
  2: 'Medium',
  3: 'High'
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

export default function HoverRating({ handleChange }) {
  const [hover, setHover] = React.useState(-1);
  const currentTaskWeight = useSelector((state) => state.tasksReducer.currentTaskWeight);
  const dispatch = useDispatch();

  return (
    <Box
      sx={{
        width: 200,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Rating
        max={3}
        name="weight"
        value={currentTaskWeight}
        precision={1}
        getLabelText={getLabelText}
        onChange={(e, newValue) => {
          dispatch(setTaskWeight(newValue))
          handleChange(e);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      {currentTaskWeight !== null && (
        <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : currentTaskWeight]}</Box>
      )}
    </Box>
  );
}
