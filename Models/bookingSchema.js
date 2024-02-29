const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
    tourId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tours', 
        required: true,
    },
    destination:{
        type:String,
        ref:'tours',
        required:true
    },
    fullName: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    bookedAt: {
        type: Date,
        required: true,
    },
    guestSize: {
        type: Number,
        required: true,
    },
    userId:{
        type:String,
        required:true
    },
    locations:{
        type:String,
        ref:'tours',
        required:true
    }
});

const bookings = mongoose.model('bookings', bookingSchema);

module.exports = bookings;