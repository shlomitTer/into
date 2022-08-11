import React from 'react'
import Popup from 'reactjs-popup';
import {BsPlusCircle} from 'react-icons/bs'
import 'reactjs-popup/dist/index.css';
import CreateEvent from './createEvent';

export default function MyEvents() {
  
  return (
    <div>
<Popup trigger={<button className='btn'><BsPlusCircle/></button>} position=" center" modal>
  <CreateEvent/>
  </Popup>
    </div>
  )
}
