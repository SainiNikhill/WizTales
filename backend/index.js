require("dotenv").config();
const config = require("./config.json");
const mongoose = require("mongoose");

const bcrypt = require("bcrypt");
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const {authenticateToken}=require('./utilities')
const upload = require('./multer')
const fs = require('fs');
const path = require('path')
const port = process.env.PORT || 8000;


const User = require("./models/user.model");
const Stories = require('./models/stories.model')
const connectDb = require("./database");

const app = express();
connectDb();
app.use(express.json());
app.use(
  cors({
    origin: "https://wiztales-frontend.onrender.com", // or "*" for testing only
  })
);

// create account
app.post("/create-account", async (req, res) => {
  const { fullname, email, password } = req.body;

  if (!fullname || !email || !password) {
    return res
      .status(400)
      .json({ error: true, message: "All fields  are required to fill" });
  }

  const isUser = await User.findOne({ email });
  if (isUser) {
    return res
      .status(400)
      .json({ error: true, message: "user already exists" });
  }
  // password hashing
  const hashedPassword = await bcrypt.hash(password, 10);

  // user creation
  const createdUser = new User({
    fullname,
    email,
    password: hashedPassword,
  });

  await createdUser.save();

  const accessToken = jwt.sign(
    { userId: createdUser._id },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "72h" }
  );

  return res.status(201).json({
    error: false,
    createdUser: { fullname: createdUser.fullname, email: createdUser.email },
    accessToken,
    message: "registered successful",
  });
});

// Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "email and password are required" });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "user not found" });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: "Invalid username & password" });
  }
  const accessToken = jwt.sign(
    {
      userId: user._id,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "72h",
    }
  );

  return res.json({
    error:false,
    message:"Login Successful",
    user: {fullname: user.fullname,email:user.email},
    accessToken,
  })
});

//get user
app.get("/get-user", authenticateToken, async (req,res)=>{
    const {userId} = req.user;
    const isUser = await User.findOne({_id:userId}).select('-password');

    if(!isUser){
        return res.sendStatus(401);

    }
    return res.json({
        user: isUser,
        message:"",
    })

})

//Route to handle image upload 
app.post('/image-upload',upload.single('image') ,async(req,res)=>
{
   try{
    if(!req.file){
      return  res
      .status(400)
      .json({error: true, message: "no image uploaded"})
    }
    const imageURL= `http://localhost:8000/uploads/${req.file.filename}`;
    res.status(201).json({ imageURL });

   } catch (error){
    res.status(500).json({ error: true, message: error.message})
   }
})

// delete an image from uploads folder
app.delete('/delete-image', async (req,res)=>{
  const {imageURL} = req.query;
  if(!imageURL){
    return res
    .status(400)
    .json({ error:true, messages:"imageURL parameters is required"})

  }
  try{

    // extract the filename from imageurl
    const filename = path.basename(imageURL);

    //define the file path 
    const filePath = path.join(__dirname, 'uploads', filename)

    //check if the file exists
    if(fs.existsSync(filePath)){
      //delete the file from the uploads folder 

      fs.unlinkSync(filePath)
      res.status(200).json({message:"image deleted  successfully"})

    }else {
      res.status(200).json({error:true, message: "image not found"});
    }
  } catch (error) {
    res.status(500).json({error:true, message: error.message});
  }
});

//serve static files from the uploads and assets directory 
app.use("/uploads",express.static(path.join(__dirname, "uploads")));
app.use("/assets",express.static(path.join(__dirname, "assets")));


//Add travel stories 
app.post("/add-travel-story", authenticateToken, async (req,res)=>{
    const { title , story , visitedLocation , imageURL, visitedDate}= req.body;
    const {userId } = req.user

    //validate required files
    if (!title || !story || !visitedLocation || !imageURL || !visitedDate) {
        return res.status(400).json ({error:true, message:"All fields are required"});
    }

    // convert visited Date from miliseconds to the date object
    const parsedVisistedDate = new Date(parseInt(visitedDate));
    try{
        const travelStory = new Stories(
            {
                title,
                story,
                visitedLocation,
                userId,
                imageURL,
                visitedDate:parsedVisistedDate,
            }
        );

        await travelStory.save();
        res.status(201).json({ story:travelStory, message:"Added Successfully"});

    } catch (error)
    {
        res.status(400).json({error: true, message:error.message})
    }

})

//get all Travel stories
app.get("/get-all-stories", authenticateToken, async(req,res)=>{
    const {userId} = req.user;
    try{
        const travelStories = await Stories.find({ userId: userId}).sort({
            isFavorite:-1,

        });
        res.status(200).json({stories:travelStories})
    } catch(error)
    {
        res.status(500).json({error: true, message:error.message})
    }
})

// edit travel stories 
app.put('/edit-story/:id', authenticateToken, async(req,res)=>{
  const { id} =req.params;
  const {title, story, visitedLocation, imageURL, visitedDate} = req.body;
  const { userId }= req.user;


  // validate required fields 
  if(!title ||!story || !visitedDate || !imageURL ||!visitedLocation){
    return res
    .status(400)
    .json({error:true, message:"all fields are required"})
  }

  // convert  visited date from ms to the date object 
  const parsedVisistedDate = new Date(parseInt(visitedDate));
   try {
    // find the travel story by id and ensure that it belongs to the authenticated user 
    const travelStory = await Stories.findOne({_id:id, userId:userId})

    if (!travelStory)
    {
      return res.status(404).json({error:true, message:" travel story not found "})
    }
    const placeholderimageURL = `http://localhost:8000/assets/placeholder.png`

    travelStory.title = title;
    travelStory.story= story;
    travelStory.visitedLocation= visitedLocation;
    travelStory.imageURL= imageURL || placeholderimageURL;
    travelStory.visitedDate=parsedVisistedDate;

    await travelStory.save();
    res.status(200).json({story:travelStory, message:"updated successful"})

   }
   catch(error){
    res.status(500).json({error:true, message:error.message});


   }
})

// delete a travel story 
app.delete('/delete-story/:id',authenticateToken, async (req,res)=>{
  const { id } =req.params;
  const {userId}= req.user;

  try{
    // find travel story by id  and ensure it belongs to the authenticated user 
    const travelStory = await Stories.findOne({_id:id,userId:userId});

    if(!travelStory){
      return res
      .status(404)
      .json({error:true , message:"travel Story not found"})
    }
    // delete travel story 
    await travelStory.deleteOne({_id:id ,userId:userId});

    //extract the filmname from the imageURL
    const imageURL =travelStory.imageURL;
    const filename = path.basename(imageURL);

    //define file path
    const filepath = path.join(__dirname,'uploads',filename);

    //delete the image file from the uploads folder
    fs.unlink(filepath,(err)=>{
      if(err){
        console.error("failed to delete image file:",err);

      }
    });
    res.status(200).json({message:"travel story deleted succesfully"});

  }
  catch(error){
    res.status(500).json({error:true, message:error.message});
  }



})

//Update isFavorite
app.put('/update-is-favourite/:id', authenticateToken, async(req,res)=>{
  const {id }= req.params;
  const { isFavourite }= req.body;
  const {userId} =req.user;

  try{
    const travelStory = await Stories.findOne({_id:id,userId:userId});

    if(!travelStory){
      return res.status(404).json({error:true,message:"trvael story not found"})

    }
    travelStory.isFavourite= isFavourite;
    await travelStory.save();

    res.status(200).json({story:travelStory,message:"updated succesfully"})

  } catch(error)
{
  res.status(500).json({error:true, message:error.message})
}  
})

//search travel stories 
app.post('/search' , authenticateToken, async(req,res)=>{
  const {query} = req.body;
  const { userId} = req.user;

  if(!query) {
    return res.status(404).json({error:true , message:"query is required"})
  }
  try{
    const searchResults = await Stories.find({
      userId:userId,
      $or:[
        {title:{$regex:query,$options:"i"}},
        {story:{$regex:query,$options:"i"}},
        {visitedLocation:{$regex:query,$options:"i"}},

      ],

    }).sort({isFavorite:-1});

    res.status(200).json({stories:searchResults});
  }
  catch(error)
  {
    res.status(500).json({error:true,message:error.message});
  }
})

// filter travel stories by date range 
app.get('/travel-stories-filter', authenticateToken , async(req,res)=>{
  const {startDate , endDate}= req.query;
  const {userId} = req.user;
  try{
    //convert startdate and enddate from ms to date objects 
    const start = new Date(parseInt(startDate));
    const end = new Date(parseInt(endDate));

    //find travel stories  that belongs to the authenticated user and fall within the date range 
    const filteredStories = await Stories.find({
      userId:userId,
      visitedDate: {$gte:start,$lte:end},

    }).sort({isFavorite:-1})
    res.status(200).json({stories:filteredStories});

  } catch(error) {
    res.status(500).json({error:true, message:error.message})
  }
})


 
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
