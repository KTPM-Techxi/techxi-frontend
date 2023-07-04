import { DatePicker, TimePicker } from 'antd';

const DateTimePicker = () => {
  const handleDateTimeChange = (date, dateString) => {
    console.log('Selected Date and Time:', dateString);
  };

  return (
    <div>
      <DatePicker showTime={{ format: 'HH:mm' }} onChange={handleDateTimeChange} />
    </div>
  );
};

export default DateTimePicker;
