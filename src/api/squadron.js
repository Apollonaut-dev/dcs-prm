import { Router } from 'express';
import { ArmedService } from '../models/ArmedService.js';
import { User } from '../models/User.js';
import { Squadron } from '../models/Squadron.js';

const router = Router();

// create
router.post('/', async (req, res, next) => {
  const { squadron_name, service_name } = req.body;
  try {
    const { id } = await ArmedService.findOne({ where: { service_name: service_name } });
    console.log('creating squadron ...')
    await Squadron.create({
      squadron_name: squadron_name,
      service_id: id,
      owner_id: req.user_id
    });
    return res.status(200).json({ message: 'OK', data: null });
  } catch (e) {
    e.statusCode = res.statusCode = res.statusCode || 500;
    return next(e);
  }
})

// read one
router.get('/:id', async (req, res, next) => {
  // const s = await Squadron.findByPk(req.params.id, { include: [User, ArmedService] });
  try {
    const s = await Squadron.findByPk(req.params.id, { include: { all: true } });
    if (s.user.owner_id != req.id) {
      res.statusCode(403);
      throw Error('unauthorized read');
    }
    s.service_name = s.armedService.dataValues.service_name;
    return res.status(200).json({ message: 'OK', data: s });
  } catch (e) {
    e.statusCode = res.statusCode = res.statusCode || 500;
    return next(e);
  }
});

// update
router.put('/:id', async (req, res, next) => {
  const { squadron_name, service_name } = req.body;
  try {
    const s = await Squadron.findByPk(req.params.id, { include: { all: true } });
    if (req.user_id != s.owner_id) {
      res.statusCode(403);
      throw Error('unauthorized read');
    }
    const { id } = await ArmedService.findOne({ where: { service_name: service_name } });
    await s.update({ squadron_name: squadron_name, service_id: id });
    return res.status(200).json({ message: 'OK', data: s });
  } catch (e) {
    e.statusCode = res.statusCode = res.statusCode || 500;
    return next(e);
  }
});

// delete
router.delete('/:id', async (req, res, next) => {
  const s = await Squadron.findByPk(req.params.id);
  try {
    if (req.user_id != s.owner_id) {
      res.statusCode = 403;
      throw Error('unauthorized deletion');
    }
    await s.destroy();
    return res.status(200).json({ message: 'OK', data: null });
  } catch (e) {
    e.statusCode = res.statusCode = res.statusCode || 500;
    return next(e);
  }
});

export default router;
