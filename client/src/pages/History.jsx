import { useEffect, useState } from 'react';
import { isBefore, isSameDay } from 'date-fns';
import DatePicker from 'react-datepicker';
import axios from 'axios';

import { Button, Toolbar, IconButton, Separator, Spacer, Text, Hr } from 'nes-ui-react';

import ViewLogModal from '../components/ViewLogModal';

const today = new Date();

const History = ({ layout = null }) => {
  useEffect(() => {
    layout?.({
      type: 'init',
      data: {
        isShowMenu: true,
        title: '運動日誌',
        backgroundColor: '#E0DCDB',
      }
    });
  }, [layout]);

  const [highlightedDates, setHighlightedDates] = useState([]);
  const [isViewLogModalOpen, setIsViewLogModalOpen] = useState(false);
  const [selectedLogDate, setSelectedLogDate] = useState();

  const getHistory = (date) => {
    //axios behavior to fetch month history for highlighting the days
    axios.get(`/api/history/${date.getFullYear()}/${date.getMonth() + 1}/`)
    .then((res) => {
      const dates = res.data.map((d) => new Date(d));

      setHighlightedDates(dates);
    });
  }

  const getLog = (date) => {
    if (!highlightedDates.some(d => isSameDay(d, date))) return;

    setSelectedLogDate(date);
    setIsViewLogModalOpen(true);
  }

  useEffect(() => {
    getHistory(today);
  }, [])

  const renderDayContents = (day, date) => {
    if (isBefore(date, today)) return <Button size="small" color="error">{day}</Button>;
  
    return <Button size="small" color="disabled">{day}</Button>;
  };
  
  const renderHeaderContents = ({
    date,
    decreaseMonth,
    increaseMonth,
    prevMonthButtonDisabled,
    nextMonthButtonDisabled,
  }) => {
    if (date.getFullYear() >= today.getFullYear() && date.getMonth() >= today.getMonth()) nextMonthButtonDisabled = true;
  
    return (
      <Toolbar borderless roundedCorners={false} className="mb-3">
        <IconButton color="primary" size="small" onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
          <span className="material-symbols-sharp text-light">chevron_left</span>
        </IconButton>
        <Separator />
        <Spacer />
        <Text size="large">{date.getFullYear()}年{date.getMonth() + 1}月</Text>
        <Spacer />
        <Separator />
        <IconButton color="primary" size="small" onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
          <span className="material-symbols-sharp text-light">chevron_right</span>
        </IconButton>
      </Toolbar>
    )
  }

  return (
    <>
      <div className="m-3 mt-0">
        <Text size="medium">點擊綠色按鈕查看當天運動紀錄。</Text>
        <Hr></Hr>
        <DatePicker
          onChange={date => getLog(date)}
          highlightDates={highlightedDates}
          renderCustomHeader={renderHeaderContents}
          renderDayContents={renderDayContents}
          filterDate={(date) => !isBefore(today, date)}
          inline
          locale="zh-TW"
          onMonthChange={(date) => {
            getHistory(date);
          }}
        />
      </div>
      <ViewLogModal open={isViewLogModalOpen} onClose={() => setIsViewLogModalOpen(false)} date={selectedLogDate} />
    </>
  );
}

export default History;
