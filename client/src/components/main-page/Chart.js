import React from 'react';
import { Bar, HorizontalBar } from 'react-chartjs-2';

const Chart = ({ data, width, height }) => {
    return (
        <Bar data={data} width={width} height={height}/>
    );
}
 
export default Chart;