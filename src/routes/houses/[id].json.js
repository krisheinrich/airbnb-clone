import houses from './_houses';

const lookup = new Map();
houses.forEach(house => {
  lookup.set(house.id, JSON.stringify(house));
});

export function get(req, res, next) {
  const { id } = req.params;

  if (lookup.has(id)) {
    res.writeHead(200, {
      'Content-Type': 'application/json'
    });

    res.end(lookup.get(id));
  } else {
    res.writeHead(404, {
      'Content-Type': 'application/json'
    });

    res.end(JSON.stringify({
      message: 'Not found'
    }));
  }
}