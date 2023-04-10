const express = require('express');
const routers = require('./routers');
const { handleError } = require('./middlewares');

const app = express();

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});
app.use(express.json());
app.use(routers);
app.use(handleError);
// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
