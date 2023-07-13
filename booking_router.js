
const express=require('express')

const router = express.Router();
const controller=require('./booking_controller')

router.get('/add-booking',controller.add_booking )

router.post('/add-booking',controller.post_booking);
router.get('/get-booking',controller.getbooking)
router.delete('/get-delete/:id',controller.deletebooking)


module.exports = router;
