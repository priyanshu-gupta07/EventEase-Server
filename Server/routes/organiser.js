import express from 'express';

const router = express.Router(); // Use camel case

router.get('/', (req, res) => {
  res.send('Hello from Organiser');
});

export default router;
