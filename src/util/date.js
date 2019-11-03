
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
  const start = new Date(startDate); // clone
  const end = new Date(endDate); // clone

  let dayCount = 0;
  while (end > start) {
    ++dayCount;
    start.setDate(start.getDate() + 1);
  }

  return dayCount;
};
