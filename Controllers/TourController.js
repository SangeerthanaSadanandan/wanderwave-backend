const tours = require('../Models/tourSchema')

// Add tour logic
exports.addTourDetails = async (req,res) => {
    console.log("Inside addTourDetails");
    
    const userId = req.payload

    // get tourDetails
    const { destination, locations, description, price, days } = req.body

    //get image
    tourImage = req.file.filename
    
    console.log(userId,destination,locations,description,price,tourImage);

    // logic for adding tourDetails
    try {
        const existingTour = await tours.findOne({ locations })
        if (existingTour) {
            res.status(402).json("Tour details already exists")
        }
        else {
            const newTour = new tours({
                destination, locations, description, price, tourImage, days, userId
            })
            await newTour.save()
            res.status(200).json(newTour) //response send to client
        }
    }
    catch (err) {
        console.error("Error in addTourDetails:", +err);
        res.status(500).json("Internal Server Error");
    }
}

//Get all tours
exports.getAllTours = async(req,res)=>{

    const searchKey = req.query.search
    const query = {
        locations:{
            $regex:searchKey,
            $options:"i"
        }
    }

    try{
        const allTours = await tours.find(query)
        res.status(200).json(allTours)//send all projects to frontend
    }
    catch(err){
        res.status(401).json("Internal server Error"+err.message);    
    }
}

//Get home tours
exports.getHomeTours =async (req,res)=>{
    try{
        const homeTours = await tours.find().limit(4)
        res.status(200).json(homeTours)//send all projects to frontend
    } catch(err){
        res.status(401).json("Internal server Error"+err.message);    
    }
}

//update tourdetails
exports.editTours = async(req,res)=>{
    const {destination,locations,description,price,days,tourImage}=req.body;

    const uploadImage = req.file?req.file.filename:tourImage;

    const userId = req.payload

    const {id} = req.params

    try{
        //find a particular tour id in mongodb and add the updated content
        const updateTour = await tours.findByIdAndUpdate({_id:id},{destination,locations,description,price,days,tourImage:uploadImage,id},{new:true})
        // save the updated content in mongodb
        await updateTour.save()
        //sending response to the client
        res.status(200).json(updateTour)
    }
    catch(err){
        res.status(401).json(err)
    }
}

//view a particular tour details
exports.getTour = async(req,res)=>{
    const {tid} = req.params
    try{
        const oneTour = await tours.findOne({_id:tid})
        res.status(200).json(oneTour)//send all projects to frontend
    }
    catch(err){
        res.status(401).json("Internal server Error"+err.message);    
    }
}

//delete a particular project
exports.deleteTour = async(req, res)=>{
    const {tid} = req.params

    try{
        const deleteData = await tours.findByIdAndDelete({_id:tid})
        res.status(200).json(deleteData)
    }
    catch(err){
        res.status(401).json(err)
    }
}

