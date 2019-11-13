import canBookDates from './_canBookDates';

export const post = async (req, res, next) => {
  // Prevent unauth'd users from checking dates
  if (!req.session.passport) {
    res.writeHead(403, {
      'Content-Type': 'application/json'
    });

    res.end(JSON.stringify({ status: 'error', message: 'Unauthorized' }));
    return;
  }

  const { houseId, startDate, endDate } = req.body;

  // Prevent auth'd users from booking dates that are already booked
  if (!await canBookDates(houseId, startDate, endDate)) {
    res.writeHead(500, {
      'Content-Type': 'application/json'
    });

    res.end(JSON.stringify({ status: 'error', message: 'House is already booked' }));
    return;
  }

  res.writeHead(200, {
    'Content-Type': 'application/json'
  });

  res.end(JSON.stringify({ status: 'success', message: 'free' }));
};
