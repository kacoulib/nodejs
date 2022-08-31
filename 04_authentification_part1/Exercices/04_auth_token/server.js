import express from 'express';
import dotenv from 'dotenv';
import session from 'express-session';
import jwt from 'jsonwebtoken';

dotenv.config();
const {
  APP_LOCALHOST: hostname,
  APP_PORT: port,
  APP_SECRET
} = process.env;

const app = express();

app.use(session({
  name: 'simple',
  secret: 'simple',
  resave: false,
  saveUninitialized: true
}));

/**
 * Route principale (pour le confort de test de l'app)
 * Nul besoin de modifier cette route
 */
app.get("/", (req, res) => {
  res.send(`
    <style>html { font-size: 1.6rem; }</style>
    <h1>Routes de l'app</h1>
    <ul>
      <li><a href="/getToken">/getToken</a> (Crée un token et le met dans la session)</li>
      <li><a href="/clear">/clear</a> (Efface la session et le token)</li>
    </ul>

    <ul>
      <li><a href="/securedRoute">/securedRoute</a> (Route accessible uniquement avec un token valide dans la session)</li>
    </ul>
  `);
});

app.get('/getToken', (req, res) => {
  // Creates new token
  const userId = Date.now().toString();
  req.session.token = jwt.sign(
    { userId, email: 'alan@alan.fr', role: 'Admin' },
    APP_SECRET,
    { expiresIn: '24h' }
  );

  // req.session.userId = userId;

  res.json({
    token: req.session.token
  });
});

app.get('/clear', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).send({ error: err.message });
    }

    res.send({ message: 'Session and token cleared successfuly!' });
  });
});

const authMiddleware = (req, res, next) => {
  if (!req.session.token) {
    return res.status(403).json({
      error: "You should be logged to access this route. Please get a token first!"
    });
  }

  try {
    const token = jwt.verify(req.session.token, APP_SECRET);
    
    console.log('Token is valid', req.session.token);

    /* if (req.session.userId && req.session.userId !== token.userId) {
      return res.status(404).json({
        error: "Error auth",
      });
    } */

    next();
  }
  catch (err) {
    res.status(403).json({
      error: `Invalid token (${err.message})`,
    });
  }
  
};

app.get('/securedRoute', authMiddleware, (req, res) => {
  res.json({ message: 'Access granted! Token is valid!' });
});

app.listen(port, () => {
  console.log(`App listening at http://${hostname}:${port}`);
});
