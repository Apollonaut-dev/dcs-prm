import assert from 'assert';
import { sequelize } from '../db.js';

import { User } from '../models/User.js';

let created_objects = [];

describe('USER', () => {
  // afterEach(async () => {
  //   await Promise.all(created_objects.map(r => r.destroy()));
  //   created_objects = [];
  // });
  describe('/signup', async () => {
    it('should return a JWT with the correct user id', async() => {
      const res = await fetch('http://localhost:8000/user/signup', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: 'user name',
          email: 'email@subdomain.domain',
          password: 'password123'
        })
      });
      console.log(res);
      const u = await User.findOne({ where: { email: 'email@subdomain.domain'}})
      assert.strictEqual(res.ok, true)
      assert.notEqual(u, null)
    });
  })
  // describe('/signin', async () => {
  //   let created_user_id; 
  //   before(async () => {
  //     User.create({
  //       name: 'Anthony',
  //       email: 'anthonydevellis@gmail.com',
  //       password_hash: ''
  //     })
  //   })
  //   it('should return a JWT with the correct user id', async() => {

  //   })
  // })
  // describe('CREATE', async () => {
  //   it('should create one user', async () => {
  //     await fetch('http://localhost:8000/user', {
  //         method: 'POST',
  //         headers: {
  //           'Accept': 'application/json',
  //           'Content-Type': 'application/json'
  //         },
  //         body: JSON.stringify({
  //           name: 'Anthony De Vellis',
  //           email: 'anthonydevellis@gmail.com',
  //           pass: 'password'
  //         })
  //       });
  //   });
  // });

  // describe('READ', async () => {
  //   it('should read the seeded user',async () => {

  //   });
  // });

  // describe('UPDATE', async () => {
  //   it('should update fields of one existing user', async () => {

  //   });
  // });

  // describe('DELETE', async () => {
  //   it('should delete the seeded user', async () => {
    
  //   });
  // });
})