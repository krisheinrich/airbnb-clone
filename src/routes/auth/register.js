import User from '../../models/user';

export const post = async (req, res) => {
  const { email, password, passwordConfirmation, firstName, lastName } = req.body;

  if (password !== passwordConfirmation) {
    res.statusCode = 500;
    res.end(JSON.stringify({ status: 'error', message: 'Passwords do not match' }));
    return;
  }

  if (!firstName || !lastName) {
    res.statusCode = 500;
    res.end(JSON.stringify({ status: 'error', message: 'First and last names are required for registration' }));
    return;
  }

  try {
    const user = await User.create({ email, password, firstName, lastName });

    req.login(user, err => {
      if (err) {
        res.statusCode = 500;
        res.end(JSON.stringify({ status: 'error', message: err }));
        return;
      }

      return res.end(JSON.stringify({ status: 'success', message: 'Logged in' }))
    });
  } catch (error) {
    let message = 'An error occurred';
    if (error.name === "SequelizeUniqueConstraintError") {
      message = 'User already exists';
    }
    res.statusCode = 500;
    res.end(JSON.stringify({ status: 'error', message }));
  }
};
