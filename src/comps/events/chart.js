import { Grid } from '@mui/material';
import React from 'react'
import CanvasJSReact from '../../graph_library/canvasjs.react';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;



export default function ChartCanvasJS() {
  const options = {
    animationEnabled: true,
    title: {
      // text: "progress graph"
    },
    subtitles: [{
      // text: "71% Tasks completed",
      verticalAlign: "center",
      fontSize: 16,
      // dockInsidePlotArea: true
    }],
    data: [{
      type: "doughnut",
      // showInLegend: true,
      indexLabel: "{name}: {y}",
      yValueFormatString: "#,###'%'",
      dataPoints: [
        // { name: "Unsatisfied", y: 5 },
        // { name: "Very Unsatisfied", y: 31 },
        { name: "Ready to start", y: 4 },
        { name: "In progress", y: 3 },
        { name: "Done", y: 3 }
      ]
    }]
  }
  return (

    <Grid item>

      <CanvasJSChart options={options} />
    </Grid>
  )
}
