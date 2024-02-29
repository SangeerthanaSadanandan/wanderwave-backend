const bookings = require('../Models/bookingSchema')

//booking logic
exports.createBooking = async (req, res) => {

    const userId = req.payload

    const { tourId, destination,locations, fullName, phoneNumber, bookedAt, guestSize } = req.body
    try {
        const newBookings = new bookings({
            tourId, destination,locations, fullName, phoneNumber, bookedAt, guestSize, userId
        })

        const savedBookings = await newBookings.save()
        res.status(200).json(savedBookings)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// get all bookings
exports.getAllBookings = async (req, res) => {
    try {
        const allBookings = await bookings.find()
        res.status(200).json(allBookings)
    }
    catch (err) {
        res.status(401).json("Internal server Error" + err.message);
    }
}

// get a particular user booking
exports.getBookings = async (req, res) => {
    const { bid } = req.params
    try {
        const userBookings = await bookings.find({userId:bid})
        res.status(200).json(userBookings)
    }
    catch(err){
        res.status(401).json("Internal server Error"+err.message);    
    }
}