const express = require('express');
const path = require('path');

const config = require('./src/configs/general.config');

const port = config.port || 3000;
const { configServer } = require('./src/configs/server.config');

// routers
const roomRouter = require('./src/routes/room.route');
const guestRouter = require('./src/routes/guest.route');
const authRouter = require('./src/routes/auth.route');
const servicesRouter = require('./src/routes/services.route');
const productReqRouter = require('./src/routes/productReq.route');

const app = express();

app.use('/public', express.static(path.join(__dirname, 'public')));

configServer(app);

app.get('/', (req, res) => {
  res.status(200).render('<p >Hello World</p>');
});

app.use('/auth', authRouter);
app.use('/room', roomRouter);
app.use('/guest', guestRouter);
app.use('/productReq', productReqRouter);

// route

/* Error handler middleware */
app.use((req, res, err) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
});
app.use('/services', servicesRouter);

app.listen(port, (err) => {
  if (err) console.error(err);
  console.log(`listening at http://localhost:${port}`);
});
