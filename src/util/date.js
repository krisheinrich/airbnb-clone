
export const getDefaultEndDate = date => (
  new Date(date.getTime() + 24 * 3600 * 1000)  // 1 day after input
);

export const firstDatePrecedesSecond = (firstDate, secondDate) => (
  firstDate.setHours(0,0,0,0) < secondDate.setHours(0,0,0,0)
);

export const isSameDate = (firstDate, secondDate) => (
  firstDate.getFullYear() === secondDate.getFullYear() &&
  firstDate.getMonth()    === secondDate.getMonth() &&
  firstDate.getDate()     === secondDate.getDate()
);

export const getNightsBetweenDates = (startDate, endDate) => {
  // clone to avoid mutating arguments
  const start = new Date(startDate);
  const end = new Date(endDate);

  let dayCount = 0;
  while (end > start) {
    ++dayCount;
    start.setDate(start.getDate() + 1);
  }

  return dayCount;
};

export const getDatesBetweenDates = (startDate, endDate) => {
  let dates = [];
  while (startDate < endDate) {
    dates.push(new Date(startDate));
    startDate.setDate(startDate.getDate() + 1);
  }
  dates.push(endDate);
  return dates;
};
