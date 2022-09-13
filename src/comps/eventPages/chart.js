import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux";

import { Chart, ArcElement, Tooltip, Title, Legend, } from "chart.js";
import { Doughnut } from 'react-chartjs-2';

Chart.register(Tooltip, Title, ArcElement, Legend,)

export default function DoughnutChart() {
  const currentEventTasks = useSelector((state) => state.tasksReducer.currentEventTasks)
  const [data, setData] = useState({
    labels: [
      'Ready',
      'In progress',
      'Done'
    ],
    datasets: [{
      data: [1, 1, 1],
      backgroundColor: [
        'rgb(166, 25, 25)',
        'rgb(255, 165, 0)',
        'rgb(62, 143, 62)'
      ],
      hoverOffset: 4
    }]
  })


  useEffect(() => {
    taskWeighting()
  }, [currentEventTasks])

  const taskWeighting = () => {
    console.log('dashbord callback change status');
    let readyWeight = 0, inProgressWeight = 0, doneWeight = 0;

    for (let i = 0; i < currentEventTasks.length; i++) {
      let element = currentEventTasks[i].status
      if (element === 'Ready') {
        readyWeight += currentEventTasks[i].weight
      }
      else if (element === 'InProgress') {
        inProgressWeight += currentEventTasks[i].weight
      }
      else if (element === 'Done') {
        doneWeight += currentEventTasks[i].weight
      }
    }
    let total = readyWeight + inProgressWeight + doneWeight;
    let tempCountersAr = [readyWeight * 100 / total, inProgressWeight * 100 / total, doneWeight * 100 / total]

    setData({
      labels: [
        'Ready',
        'In progress',
        'Done'
      ],
      datasets: [{
        data: tempCountersAr,
        backgroundColor: [
          'rgb(166, 25, 25)',
          'rgb(255, 165, 0)',
          'rgb(62, 143, 62)'
        ],
        hoverOffset: 4
      }]
    })
  }
  const options = {
    plugins: {
      legend: {
        position: 'bottom',
        align: 'end',
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          textAlign: 'center'
        }
      }
    }
  }

  return (
    <div>
      <Doughnut
        height={250}
        width={250}
        data={data}
        options={options}
      />
    </div>
  )
}
