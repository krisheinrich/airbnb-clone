import { User } from '../../model.js';

export const post = async (req, res) => {
  const { email, password, passwordConfirmation } = req.body;

  if (password !== passwordConfirmation) {
    res.end(JSON.stringify({ status: 'error', message: 'Passwords do not match' }));
    return;
  }

  try {
    const user = await User.create({ email, password });
    res.end(JSON.stringify({ status: 'success', message: 'User added' }));
  } catch (error) {
    res.statusCode = 500;
    let message = 'An error occurred';
    if (error.name === "SequelizeUniqueConstraintError") {
      message = 'User already exists';
    }
    res.end(JSON.stringify({ status: 'error', message }));
  }
};
