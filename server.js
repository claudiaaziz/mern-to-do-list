require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
// const cors = require('cors');
const path = require('path');

const authRoute = require('./routes/auth');
const toDosRoute = require('./routes/todos');

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
// app.use(cors());

app.get('/api', (req, res) => {
  res.send('Express Server 🩷');
});

app.use('/api/auth', authRoute);
app.use('/api/todos', toDosRoute);

app.use(express.static(path.resolve(__dirname, './client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to database');

    app.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    );
  })
  .catch((err) => {
    console.log(err);
  });
