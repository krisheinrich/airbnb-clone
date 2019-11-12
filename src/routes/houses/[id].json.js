import House from '../../models/house';
import User from '../../models/user';
import Review from '../../models/review';

export async function get(req, res, next) {
  const { id } = req.params;

  try {
    const house = await House.findByPk(id);

    if (house) {
      // get host information and all reviews for listing
      const [host, reviews] = await Promise.all([
        User.findByPk(house.host, { attributes: ['firstName'] }),
        Review.findAndCountAll({ where: { houseId: house.id } })
      ]);

      house.dataValues.hostName = host.dataValues.firstName;
      // attach reviewer's first name to review
      house.dataValues.reviews = await Promise.all(reviews.rows.map(async review => {
        const reviewer = await User.findByPk(review.dataValues.userId, { attributes: ['firstName'] });
        const userName = reviewer.dataValues.firstName;
        return { ...review.dataValues, userName };
      }));
      house.dataValues.reviewsCount = reviews.count;

      res.writeHead(200, {
        'Content-Type': 'application/json'
      });

      res.end(JSON.stringify(house.dataValues));
    } else {
      res.writeHead(404, {
        'Content-Type': 'application/json'
      });

      res.end(JSON.stringify({
        message: 'Not found'
      }));
    }
  } catch (error) {
    console.error(error);

    res.writeHead(404, {
      'Content-Type': 'application/json'
    });

    res.end(JSON.stringify({
      message: 'There was an error retrieving data'
    }));
  }
}
