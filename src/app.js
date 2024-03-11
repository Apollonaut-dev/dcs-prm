import express from 'express';
// import bodyParser from 'body-parser';

import * as routes from './routes.js';

import { sequelize } from './db.js';

import is_auth from './middleware/is_auth.js';

import { SupportedServices, SupportedServicesLongNames } from './models/NATO_OFFICER_RANKS.js';
import { ArmedService } from './models/ArmedService.js';
import { Rank } from './models/Rank.js';
import { Squadron } from './models/Squadron.js';

const API = express();
const port = 8000;

// API.use(bodyParser.urlencoded({ extended: true }));
API.use(express.json())

API.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

API.get('/', is_auth, (req, res) => {
  res.send('Hello, World!');
});

API.use('/user', routes.user);
API.use('/squadron', routes.squadron);
API.use('/pilot', routes.pilot);

// handle routing problems
API.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

API.listen(port, () => {
  console.log('\tAPI started on localhost:8000');
  console.log('\texecuting in environment: ' + process.env.NODE_ENV);
})

if (process.env.NODE_ENV == 'development') {
  console.log('dropping all tables');
  await sequelize.dropAllSchemas();
  await sequelize.sync({ force: true });
}

// static data

await populate_static_data();

async function populate_static_data() {
  if (process.env.NODE_ENV == 'development') {
    for (let i = 0; i < SupportedServices.length; i++) {
      console.log('adding service: ' + SupportedServices[i]);
      await ArmedService.create({ service_name: SupportedServices[i], long_name: SupportedServicesLongNames[i] })
    }
    await Rank.create({ service_id: 3, NATO_code: 'OF-0', service_code: 'O-0', full_name: 'Midshipman', abbreviated_name: 'MIDN' });
    await Rank.create({ service_id: 3, NATO_code: 'OF-1', service_code: 'O-1', full_name: 'Second Lieutenant', abbreviated_name: '2ndLt' });
    await Rank.create({ service_id: 3, NATO_code: 'OF-1', service_code: 'O-2', full_name: 'First Lieutenant', abbreviated_name: '1stLt' });
    await Rank.create({ service_id: 3, NATO_code: 'OF-2', service_code: 'O-3', full_name: 'Captain', abbreviated_name: 'Capt' });
    await Rank.create({ service_id: 3, NATO_code: 'OF-3', service_code: 'O-4', full_name: 'Major', abbreviated_name: 'Maj' });
    await Rank.create({ service_id: 3, NATO_code: 'OF-4', service_code: 'O-5', full_name: 'Lieutenant Colonel', abbreviated_name: 'LtCol' });
    await Rank.create({ service_id: 3, NATO_code: 'OF-5', service_code: 'O-6', full_name: 'Colonel', abbreviated_name: 'Col' });
    await Rank.create({ service_id: 2, NATO_code: 'OF-0', service_code: 'O-0', full_name: 'Midshipman', abbreviated_name: 'MIDN' });
    await Rank.create({ service_id: 2, NATO_code: 'OF-1', service_code: 'O-1', full_name: 'Ensign', abbreviated_name: 'ENS' });
    await Rank.create({ service_id: 2, NATO_code: 'OF-1', service_code: 'O-2', full_name: 'Lieutenant Junior Grade', abbreviated_name: 'LTJG' });
    await Rank.create({ service_id: 2, NATO_code: 'OF-2', service_code: 'O-3', full_name: 'Lieutenant', abbreviated_name: 'LT' });
    await Rank.create({ service_id: 2, NATO_code: 'OF-3', service_code: 'O-4', full_name: 'Lieutenant Commander', abbreviated_name: 'LCDR' });
    await Rank.create({ service_id: 2, NATO_code: 'OF-4', service_code: 'O-5', full_name: 'Commander', abbreviated_name: 'CDR' });
    await Rank.create({ service_id: 2, NATO_code: 'OF-5', service_code: 'O-6', full_name: 'Captain', abbreviated_name: 'CAPT' });

  }
}
