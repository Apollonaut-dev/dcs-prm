// import assert from 'assert';
// import { sequelize } from '../db.js';

// import { User } from '../models/User.js';
// import { ArmedService } from '../models/ArmedService.js';
// import { Squadron } from '../models/Squadron.js';

// let created_objects = [];

// describe('SQUADRONS', () => {
//   // use this when connecting with a purpose built test database...for now in early development we only have 1 DB 9-3-2024
//   // before(async () => {
//   //   Squadron.sync({ force: true });
//   // });
//   let u;
//   before(async () => {
//     u = await User.create({
//       name: 'Antonio Devellius',
//       email: 'my@nigga.troy',
//       password_hash: 'abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890'
//     });
//   })
//   after(async () => {
//     await u.destroy();
//   })
//   afterEach(async () => {
//     await Promise.all(created_objects.map(r => r.destroy()))
//     created_objects = [];
//   })
//   describe('CREATE', () => {
//     it('should create one squadron', async () => {

//       await fetch('http://localhost:8000/squadron', {
//         method: 'POST',
//         headers: {
//           'Accept': 'application/json',
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           'squadron_name': 'VMFA(AW)-224',
//           'service_name': 'USMC'
//         })
//       });
//       const s = await Squadron.findOne({ where: { squadron_name: 'VMFA(AW)-224' } })
//       const armedService = await s.getArmedService();
//       created_objects.push(s);

//       assert.notEqual(s, null);
//       assert.equal(s.squadron_name, 'VMFA(AW)-224');
//       assert.equal(armedService.service_name, 'USMC');
//     });
//   });
//   describe('READ', () => {
//     let seeded_squadron_id;
//     before(async () => {
//       const s = await Squadron.create({
//         squadron_name: 'VFA-14',
//         service_id: 3,
//         owner_id: u.id
//       });
//       seeded_squadron_id = s.id;
//       created_objects.push(s);
//     });

//     it('should read the seeded data object and return all the correct fields', async () => {
//       const res = await fetch('http://localhost:8000/squadron/' + seeded_squadron_id, {
//         method: 'GET',
//       });
//       const j = await res.json();
//       const s = j.data;
//       assert.notEqual(s, null);
//       assert.equal(s.squadron_name, 'VFA-14');
//       assert.equal(s.armedService.service_name, 'USMC');
//     });
//   });
//   describe('UPDATE', () => {
//     let seeded_squadron_id;
//     before(async () => {
//       const s = await Squadron.create({
//         squadron_name: 'VFA-14',
//         service_id: 3,
//         owner_id: u.id
//       });
//       seeded_squadron_id = s.id;
//       created_objects.push(s);
//     });

//     it('should read the seeded data object and return all the correct fields', async () => {
//       const res = await fetch('http://localhost:8000/squadron/' + seeded_squadron_id, {
//         method: 'GET',
//       });
//       const { data } = await res.json();
//       const s = data;
//       const updated_s = await fetch('http://localhost:8000/squadron/' + seeded_squadron_id, {
//         method: 'PUT',
//         headers: {
//           'Accept': 'application/json',
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           'squadron_name': 'VMFA(AW)-224',
//           'service_name': 'USN'
//         })
//       });
//       const db_s = await Squadron.findByPk(seeded_squadron_id, { include: ArmedService });
//       assert.notEqual(db_s, null);
//       assert.equal(db_s.squadron_name, 'VMFA(AW)-224');
//       assert.equal(db_s.armedService.service_name, 'USN');
//     });
//   });
//   describe('DELETE', () => {
//     let seeded_squadron_id;
//     before(async () => {
//       const s = await Squadron.create({
//         squadron_name: 'VFA-14',
//         service_id: 3,
//         owner_id: u.id
//       });
//       seeded_squadron_id = s.id;
//       created_objects.push(s);
//       seeded_squadron_id = s.id;
//     });

//     it('should read the seeded data object and return all the correct fields', async () => {
//       const res = await fetch('http://localhost:8000/squadron/' + seeded_squadron_id, {
//         method: 'DELETE',
//       });

//       const db_s = await Squadron.findByPk(seeded_squadron_id);
//       assert.equal(db_s, null);
//     });
//   });
// });