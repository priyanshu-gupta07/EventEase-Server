import { Router } from 'express';
const router = Router();
import upload from '../utils/multer.js';
import Cloudinary from '../utils/cloudinary.js';
import { createEvent, 
    getAvailableEvents, 
    getSingleEvent, 
    updateEvent, 
    deleteEvent, 
    getEventsByDate, 
    getEventsByOrganizer, 
    getEventsByTitle, 
    getEventsByLocation,
    getEventsByTag, 
    updateEventseats } from '../controllers/event.js';

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
router.put('/:id', upload.single('image'), async (req, res) => {
    try {
        let imageUrl;

        if (req.file) {
            Cloudinary.uploader.upload(req.file.path, async (err, result) => {
                if (err) {
                    console.error('Error uploading image to Cloudinary:', err);
                    return res.status(500).send('Internal Server Error');
                }
        
                req.body.image = result.secure_url;
                console.log('Image uploaded to Cloudinary:', result.secure_url);
                await updateEvent(req, res);
        })} else {
            req.body.image = req.body.image;
            await updateEvent(req, res);
        }
        
    } catch (err) {
        console.error('Error updating event:', err);
        res.status(500).send('Internal Server Error');
    }
});

router.delete('/:id', deleteEvent);

router.get('/date/:date', getEventsByDate);
router.get('/organizer/:email', getEventsByOrganizer);
router.get('/title/:title', getEventsByTitle);
router.get('/location/:location', getEventsByLocation);
router.get('/tag/:tag', getEventsByTag);
router.put('/updateSeats/:id', updateEventseats);

export default router;
