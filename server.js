require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const authRoute = require('./routes/auth');

const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.get('/api', (req, res) => {
  res.send('Express Server 🩷');
});

app.use('/api/auth', authRoute);

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
