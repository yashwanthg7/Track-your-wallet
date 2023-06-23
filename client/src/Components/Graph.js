import React, { useRef, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Legend } from 'chart.js';
import styled from 'styled-components';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Legend);

const Container = styled.div`
  display: flex;
  justify-content: center;
  max-width: 20rem;
  margin: 0 auto;
`;

const Item = styled.div`
  /* Your item styles here */
`;

const ChartWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-top: 2rem;
`;

const TotalElement = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #48bb78;
  margin-top: 1rem;
`;

const Graph = () => {
    const chartRef = useRef(null);

    useEffect(() => {
        const chartInstance = chartRef.current.chartInstance;
        if (chartInstance) {
            chartInstance.destroy();
        }
    }, []);

    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    const data = {
        labels: labels,
        datasets: [
            {
                label: 'My First Dataset',
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: true,
                backgroundColor: 'aqua',
                borderColor: 'rgb(75, 192, 192)',
                pointBorderColor: 'aqua',
                tension: 0.1,
            },
        ],
    };

    const options = {
        plugins: {
            legend: true,
        },
        scales: {
            // y : {
            //     // min : 3,
            //     // max: 6, 
            // }
        },
    };

    return (
        <Container>
            <Item></Item>

            <ChartWrapper>
                <Line data={data} options={options} ref={chartRef} />
                <TotalElement>
                    Total:   <span>₹0</span>
                </TotalElement>
            </ChartWrapper>

            <div className='flex flex-col py-10 ga-4'>
                {/* Labels */}
            </div>
        </Container>
    );
};

export default Graph;