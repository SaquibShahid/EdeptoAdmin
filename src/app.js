require('dotenv').config();
const express = require('express');
require('../src/database/conn');
const app = express();

const Admin = require('../src/models/admins');
const router = require('../src/routers/adminRoutes')


app.use(express.json());
app.use(router);
const port = process.env.PORT || 3000;

console.log(process.env.SECRET_KEY);

app.listen(3000, () => {
  console.log(`Example app listening on port ${port}`);
});