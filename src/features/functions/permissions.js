
//check if user is a participant of the event
export const isRelated = (_event, _userId) => {
  let usersArr = _event.usersId_arr.map(item => item._id)
  return _event.user_id._id === _userId || usersArr.includes(_userId)
}

//check if user can edit the event
export const isEditEventAllowed = (_event, _userId) => {
  let usersArr = _event.usersId_arr.map(item => item._id)
  return _event.user_id._id === _userId ||
    (usersArr.includes(_userId) && _event.EditableByParticipants)
}

//check if user can edit the task(creator of the event and task or task participants )
export const isTaskEditAllowed = (_event, _task, _userId) => {
  let usersArr = _task.usersId_arr.map(item => item._id)
  return (_event?.user_id._id === _userId || _task.user_id._id === _userId || usersArr.includes(_userId))
}

