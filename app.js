const express = require("express"),
  graphqlHTTP = require("express-graphql"),
  mongoose = require("mongoose"),
  schema = require("./graphql/schema");

require("dotenv").load();
const { PORT, URI } = process.env;

mongoose
  .connect(
    URI,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB ready to use !!!"));

const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true
  })
);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
