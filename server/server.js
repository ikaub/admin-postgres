const express = require('express');
const cors = require('cors');
const config = require('dotenv');
const authJwt = require('express-jwt');
const { graphqlHTTP } = require('express-graphql');

config.config();

const db = require('./database/database');
const schema = require('./graphql/schema');

const PORT = 5000;

const app = express();

const auth = authJwt({
  secret: process.env.JWT_SECRET,
  credentialsRequired: false,
  algorithms: ['sha1', 'RS256', 'HS256'],
});

app.use(cors());
app.use(express.json());
app.use('/graphql', auth, graphqlHTTP(req => ({
  schema,
  context: {
    user: req.user,
  },
  graphiql: true,
})));

db.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`App has been started on port ${PORT}.`);
  });
});


