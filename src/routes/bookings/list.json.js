import Booking from '../../models/booking';
import House from '../../models/house';
import User from '../../models/user';
import { Op } from 'sequelize';

export async function get(req, res, next) {
  if (!req.session.passport || !req.session.passport.user) {
    res.writeHead(403, {
      'Content-Type': 'application/json'
    });

    res.end(JSON.stringify({ status: 'error', message: 'Unauthorized' }));
    return;
  }

  const userEmail = req.session.passport.user;
  const user = await User.findOne({ where: { email: userEmail } });

  const result = await Booking.findAndCountAll({
    where: {
      userId: user.id,
      paid: true, 
      endDate: { [Op.gte]: new Date() }
    },
    order: [['startDate', 'ASC']]
  });

  const bookings = await Promise.all(result.rows.map(async booking => {
    const house = await House.findByPk(booking.houseId);
    return { booking: booking.dataValues, house: house.dataValues };
  }));

  res.writeHead(200, {
    'Content-Type': 'application/json'
  });

  res.end(JSON.stringify(bookings));
}
