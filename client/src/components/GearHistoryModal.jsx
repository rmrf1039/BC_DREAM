import { useEffect, useState } from 'react';
import { sportNameTranslation } from './translation'
import Chart from 'chart.js/auto';
import axios from 'axios';

import { Text, Modal, Header, Spacer, ModalContent, IconButton, PixelIcon, Heading, Br } from "nes-ui-react";

const GearHistoryModal = ({token_id, open, onClose }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (!open || !token_id) return;

    axios.get(`/api/history/${token_id}/`)
    .then((res) => {
      let arr = res.data;
      let data = {};

      setChartData(null);

      if (!arr) return

      Object.keys(arr).forEach((type) => {
        data[type] = {
          index: []
        }

        arr[type].forEach((row, index) => {
          data[type].index.push(index + 1)

          Object.entries(row).forEach((value) => {
            if (!data[type][value[0]]) data[type][value[0]] = []

            data[type][value[0]].push(value[1])
          })
        });
      })

      setChartData(data);
    });
  }, [open]);

  useEffect(() => {
    if (!chartData) return
    
    Object.keys(chartData).forEach((type) => {
      chartData[type].chart = new Chart(
        document.getElementById(type),
        {
          type: 'line',
          data: {
            labels: chartData[type].index,
            datasets: [
              {
                label: '平均每日總次數',
                data: chartData[type].mean_count,
              },
              {
                label: '平均每日合格次數',
                data: chartData[type].mean_valid_count,
              }
            ]
          }
        }
      );
    });
  }, [chartData]);

  return (
    <Modal className="top-50 start-50 translate-middle" open={open}>
      <Header>
        <Heading dense size="large">運動軌跡</Heading>
        <Spacer />
        <IconButton color="error" onClick={() => {
          if (chartData) {
            Object.values(chartData).forEach((row) => {
              row.chart.destroy();
            });
          }
          
          onClose();
        }}>
          <PixelIcon name="pixelicon-close" size='small' color='white' />
        </IconButton>
      </Header>
      <ModalContent>
        {
          !chartData &&
          <Text className='text-center'>無紀錄</Text>
        }
        {
          Object.keys(chartData || []).map((key) => (
            <div key={`${key}-graph`}>
              <Text className='mb-0'>{ sportNameTranslation(key) }</Text>
              <canvas id={key}></canvas>
              <br />
            </div>
          ))
        }
      </ModalContent>
    </Modal>
  );
}

export default GearHistoryModal;