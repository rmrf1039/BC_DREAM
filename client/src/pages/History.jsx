import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { subDays, isBefore, isSameDay } from 'date-fns';

import { Button, Toolbar, IconButton, Separator, Spacer, Text, Heading, Br, Hr } from 'nes-ui-react';

import ViewLogModal from '../components/ViewLogModal';

const today = new Date();
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
      <Text size="large">{date.getFullYear()}/{date.getMonth() + 1}</Text>
      <Spacer />
      <Separator />
      <IconButton color="primary" size="small" onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
        <span className="material-symbols-sharp text-light">chevron_right</span>
      </IconButton>
    </Toolbar>

  )
}

const History = () => {
  const [highlightedDates, setHighlightedDates] = useState([]);
  const [isViewLogModalOpen, setIsViewLogModalOpen] = useState(false);
  const [viewLogModalData, setViewLogModalData] = useState();

  const getHistory = () => {
    //axios behavior to fetch month history for highlighting the days
    const dates = [subDays(new Date(), 7), subDays(new Date(), 6), subDays(new Date(), 5), subDays(new Date(), 3)];
    setHighlightedDates(dates);
  }

  const getLog = (date) => {
    if (!highlightedDates.some(d => isSameDay(d, date))) return;

    console.log(date);
    //axios behavior to fetch the log data of the targeted date

    setViewLogModalData({
      date
    });
    setIsViewLogModalOpen(true);
  }

  useEffect(() => {
    getHistory();
  })

  return (
    <>
      <div className="m-3 mt-0">
        <Heading dense size="xlarge" className="pt-0">History</Heading>
        <Text size="medium">Pick the day with green background to see the log.</Text>
        <Hr></Hr>
        <DatePicker
          onChange={date => getLog(date)}
          highlightDates={highlightedDates}
          renderCustomHeader={renderHeaderContents}
          renderDayContents={renderDayContents}
          inline
        />
      </div>
      <ViewLogModal open={isViewLogModalOpen} onClose={() => setIsViewLogModalOpen(false)} data={viewLogModalData} />
    </>
  );
}

export default History;
