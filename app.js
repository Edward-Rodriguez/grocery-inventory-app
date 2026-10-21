import express from 'express';
import itemRouter from './routes/itemRouter.js';
import brandRouter from './routes/brandRouter.js';

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use('/', itemRouter);
app.use('/brands', brandRouter);

const PORT = process.env.PORT || 3001;
const HOST = process.env.HOST || 'localhost';

app.listen(PORT, HOST, (error) => {
  error && console.error(error);
  console.log(`Listening on port ${PORT}`);
});
