const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./src/config/documentation.json');
var  morgan = require('morgan');
var path = require('path');
var fs = require('fs')
const app = express();
const PORT = 3000;
app.use(morgan('combined', {
    skip: function (req, res) { return res.statusCode != 500 },
  stream: fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
  }))

const swaggerOptions = {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: "notes"
};
const authentification = require('./src/middleware/authentification.middleware');

app.use(express.json())
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, swaggerOptions));
app.use('/api/taches',authentification, require('./src/routes/api/taches'));
app.use('/api/sousTaches',authentification, require('./src/routes/api/sousTaches'));
app.use('/api/users', require('./src/routes/api/user'));

app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});