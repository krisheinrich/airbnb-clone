import Booking from '../../models/booking';

export const post = async (req, res, next) => {
  await Booking.destroy({ where: { paid: false } });

  res.writeHead(200, {
    'Content-Type': 'application/json'
  });

  res.end(JSON.stringify({ status: 'success', message: 'OK' }));
};
