import User from '../../models/user';
import Booking from '../../models/booking';

export const post = async (req, res, next) => {

  try {
    const userEmail = req.session.passport.user;
    console.log("User email =", userEmail);
    const user = await User.findOne({ where: { email: userEmail } });

    await Booking.create({
      houseId: req.body.houseId,
      userId: user.id,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
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
