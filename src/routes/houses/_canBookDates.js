import Booking from '../../models/booking';
import { Op } from 'sequelize';

const canBookDates = async (houseId, startDate, endDate) => {
  const results = await Booking.findAll({
    where: {
      houseId,
      startDate: {
        [Op.lte]: new Date(endDate)
      },
      endDate: {
        [Op.gte]: new Date(startDate)
      }
    }
  });

  return !(results.length > 0);
};

export default canBookDates;
