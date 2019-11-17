import User from '../../models/user';
import Booking from '../../models/booking';

export const post = async (req, res, next) => {
  try {
    const userEmail = req.session.passport.user;
    const user = await User.findOne({ where: { email: userEmail } });
    const { houseId, startDate, endDate, sessionId } = req.body;

    await Booking.create({
      houseId,
      userId: user.id,
      startDate,
      endDate,
      sessionId
    });

    res.writeHead(200, {
      'Content-Type': 'application/json'
    });

    res.end(JSON.stringify({ status: 'success', message: 'OK' }));
  } catch (error) {
    console.error(error);

    res.writeHead(404, {
      'Content-Type': 'application/json'
    });

    res.end(JSON.stringify({
      message: 'There was an error retrieving data'
    }));
  }
};
