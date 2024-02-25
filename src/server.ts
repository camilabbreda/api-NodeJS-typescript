import 'dotenv/config';
import express from 'express';
import routes from './infrastructure/routes';


const app = express();
app.use(express.json());
app.use(express.text());

app.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  next();

});

routes(app);
app.listen(process.env.PORT_SERVER, ()=>{
  console.log(`Server is running on port ${process.env.PORT_SERVER}`);
});