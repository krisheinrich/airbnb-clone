
export const getDefaultEndDate = date => {
  return new Date(date.getTime() + 24 * 3600 * 1000);  // 1 day after input
};

export const firstDatePrecedesSecond = (firstDate, secondDate) => {
  return firstDate.setHours(0,0,0,0) < secondDate.setHours(0,0,0,0);
};

export const isSameDate = (firstDate, secondDate) => (
  firstDate.getFullYear() === secondDate.getFullYear() &&
  firstDate.getMonth()    === secondDate.getMonth() &&
  firstDate.getDate()     === secondDate.getDate()
);
