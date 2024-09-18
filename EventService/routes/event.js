const express = require('express');
const router = express.Router();
const upload = require('../utils/multer');
const Cloudinary = require('../utils/cloudinary');
const {
    createEvent,
    getAvailableEvents,
    getSingleEvent,
    updateEvent,
    deleteEvent,
    getEventsByDate,
    getEventsByOrganizer,
    getEventsByTitle,
    getEventsByLocation,
    getEventsByTag
} = require('../controllers/event'); // Adjust path as needed

// Basic CRUD routes
router.post('/', upload.single('image'), async (req, res) => {
    Cloudinary.uploader.upload(req.file.path, async (err, result) => {
        if (err) {
            console.error('Error uploading image to Cloudinary:', err);
            return res.status(500).send('Internal Server Error');
        }

        req.body.image = result.secure_url;
        console.log('Image uploaded to Cloudinary:', result.secure_url);
        await createEvent(req, res);
    });
});
router.get('/', getAvailableEvents);
router.get('/:id', getSingleEvent);
router.put('/:id', updateEvent);
router.delete('/:id', deleteEvent);

// Advanced search routes
router.get('/date/:date', getEventsByDate);
router.get('/organizer/:email', getEventsByOrganizer);
router.get('/title/:title', getEventsByTitle);
router.get('/location/:location', getEventsByLocation);
router.get('/tag/:tag', getEventsByTag);

module.exports = router;
