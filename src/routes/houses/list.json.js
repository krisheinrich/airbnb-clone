import House from '../../models/house';

export async function get(req, res, next) {
  try {
    // TO DO: handle pagination
    const result = await House.findAndCountAll();
    const houses = result.rows.map(house => house.dataValues);

    res.writeHead(200, {
      'Content-Type': 'application/json'
    });

    res.end(JSON.stringify(houses));
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
