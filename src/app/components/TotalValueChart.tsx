import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { reduceArrayLenth } from '../utils/dataUtils';

type TotalValueDataPoint = {
    timestamp: number;
    value_usd: number;
}

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );


const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Total Value chart',
      },
    },
};

const TotalValueChart = (props: {data: TotalValueDataPoint[]}) => {
    let data: TotalValueDataPoint[] = props.data;
    data = reduceArrayLenth(data, 30);

    const labels = data.map(_data => {
        let date: any = new Date(_data.timestamp *1000);
        date = date.toLocaleDateString();
        return date;
    });

    const datasets = [
        {
            label: 'Value in USDT',
            data: data.map(_data => _data.value_usd),
            borderColor: 'rgb(37 99 235)',
      backgroundColor: 'rgb(191 219 254)',
        }
    ]

    const chartData = {
        labels,
        datasets
    }

    return  <div>
      <p>
        Here is what it looks like: 
      </p>
      <Line height={'320px'} options={options} data={chartData} />
    </div>
    

};

export default TotalValueChart;