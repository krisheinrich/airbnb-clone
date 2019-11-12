import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';
import bodyParser from 'body-parser';
import session from 'express-session';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { sequelize } from './database';
import User from './models/user';
import House from './models/house';
import Review from './models/review';

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

// Sync models with Sequelize

User.sync({ alter: true });
House.sync({ alter: true });
Review.sync({ alter: true });

// Configure session middleware

const sessionStore = new SequelizeStore({ db: sequelize });

const sessionConfig = {
	secret: 'GO7Ev0ZzmvauTi7fry',
	resave: false,
	saveUninitialized: true,
	name: 'airbnbclone',
	cookie: {
		maxAge: 30 * 24 * 60 * 60 * 1000
	},
	store: sessionStore
};

// Configure Passport middleware

passport.use(new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password'
}, async function(email, password, done) {
	if (!email || !password) {
		done('Email and password required', null);
		return;
	}

	const user = await User.findOne({ where: { email: email } });

	if (!user) {
		done('User not found', null);
		return;
	}

	const valid = await user.isPasswordValid(password);

	if (!valid) {
		done('Email and password do not match', null);
	}

	done(null, user);
}));

passport.serializeUser((user, done) => {
	done(null, user.email);
});

passport.deserializeUser((email, done) => {
	User.findOne({ where: { email: email } }).then(user => {
		done(null, user);
	});
});

// Register middleware and start application server

polka() // You can also use Express
	.use(
		session(sessionConfig),
		bodyParser.json(),
		passport.initialize(),
		passport.session(),
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		sapper.middleware({
			session: req => ({
				user: req.session && req.session.passport && req.session.passport.user
			})
		})
	)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});
