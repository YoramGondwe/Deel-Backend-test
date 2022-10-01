const express = require('express');
const bodyParser = require('body-parser');
const {sequelize} = require('./model')
const {getProfile} = require('./middleware/getProfile')
const contractRoutes = require('./routes/contractorRoutes');
const jobRoutes = require('./routes/JobRoutes')
const accountingRoutes = require('./routes/accountRoutes')
const adminRoutes = require('./routes/adminRoutes')

const app = express();
app.use(bodyParser.json());
app.set('sequelize', sequelize)
app.set('models', sequelize.models)

app.use('/contracts',contractRoutes);
app.use('/jobs',jobRoutes);
app.use('/balances',accountingRoutes);
app.use('/admin',adminRoutes);

module.exports = app;
