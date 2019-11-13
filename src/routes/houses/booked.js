import { Op } from 'sequelize';
import Booking from '../../models/booking';

const getDatesBetweenDates = (startDate, endDate) => {
  let dates = [];
  // add all dates booked, from start until end
  while (startDate < endDate) {
    dates.push(new Date(startDate));
    startDate.setDate(startDate.getDate() + 1);
  }
  dates.push(endDate);
  return dates;
};

export const post = async (req, res, next) => {
  const { houseId } = req.body;

  const results = await Booking.findAll({
    where: {
      houseId,
      endDate: {
        [Op.gte]: new Date()
      }
    }
  });

  let bookedDates = [];

  for (const booking of results) {
    const dates = getDatesBetweenDates(new Date(booking.startDate), new Date(booking.endDate));
    bookedDates.push(...dates);
  }

  // remove duplicates
  let uniqueDates = new Set(bookedDates.map(d => d.getTime()));
  bookedDates = Array.from(uniqueDates).map(time => new Date(time));

  res.writeHead(200, {
    'Content-Type': 'applicatiom/json'
  });

  res.end(JSON.stringify({
    status: 'success',
    message: 'OK',
    dates: bookedDates
  }));
};
