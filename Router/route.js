// import express
const express = require('express')

const AuthController = require('../Controllers/AuthController')
const TourController = require('../Controllers/TourController')
const BookingController = require('../Controllers/BookingController')

const jwtMiddleware = require('../Middlewares/jwtMiddleware')

const multerConfig = require('../Middlewares/multerMiddleware')

//create a router object of express to define routes(paths)
const router = new express.Router()

                          // using router object to define paths

//1.Register API routes - localhost:4000/register
router.post('/register',AuthController.register)

//2.Login API routes - localhost:4000/login
router.post('/login',AuthController.login)

//3.add tour API routes - localhost:4000/tours/add
router.post('/tours/add',jwtMiddleware, multerConfig.single('tourImage'), TourController.addTourDetails)

//4.get all tours path - https://localhost:4000/tour/all-tours
router.get('/tour/all-tours',TourController.getAllTours)

//5.get home tour - https://localhost:4000/tour/home-tours
router.get('/tour/home-tours',TourController.getHomeTours)

//6.get all user - https://localhost:4000/user/getallusers
router.get('/user/getallusers',AuthController.getAllUsers)

//7.update a tour - https://localhost:4000/tour/update-tour/72986591258
router.put('/tour/update-tour/:id',jwtMiddleware,multerConfig.single('tourImage'),TourController.editTours)

//8.view particular tour - https://localhost:4000/tour/view-tour/658585875856556
router.get('/tour/view-tour/:tid',TourController.getTour)

//9.delete particular tour - https://localhost:4000/tour/delete-tour/658585875856556
router.delete('/tour/delete-tour/:tid',jwtMiddleware,TourController.deleteTour)

//10.booking 
router.post('/tour/create-booking', jwtMiddleware, BookingController.createBooking);

//11.get all bookings
router.get('/booking/allbookings',BookingController.getAllBookings)

//12.view a particular user details
router.get('/user/viewuser/:uid',AuthController.getUser)

//13.get a particular user booking details
router.get('/booking/viewbooking/:bid',BookingController.getBookings)







module.exports = router
