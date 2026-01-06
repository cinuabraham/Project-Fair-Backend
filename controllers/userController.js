//logic to resolve the request
//import model
const users = require('../Modals/userSchema')

//import jwt
const jwt = require('jsonwebtoken')

//logic for register
exports.register = async (req, res) => {
    //logic
    console.log('inside controller register function');

    //extract data from request body
    //destructure cheythathinte kaaranam json() in index.js file convert json data into javascript object

    const { username, email, password } = req.body
    try { const existUser = await users.findOne({email})
      if(existUser){
        res.status(406).json('Account Already Exist...Please Login')
      }

   else{
        //create an object for the model
        const newUser = new users({
            username,
            email,
            password,
            github:"",
            linkedin:"",
            profile:""
        })
        //save function in moongose - to permanently store this data in mongodb
        await newUser.save()
              //response
        res.status(200).json(newUser)
   }}
   catch(err){
    res.status(401).json('Register Request Faild due to ',err)
    
   }
    }

//logic for  Login
exports.login = async(req,res)=>{
  console.log('inside controller login function');

  const {email,password} = req.body

 try{ const existingUser = await users.findOne({email,password})
  console.log(existingUser);

  if(existingUser){

    ///first argument is the data that is send inside the token and the second argument is the key based on which the token is generated
    const token = jwt.sign({userId:existingUser._id},"supersecretkey12345")

    res.status(200).json({
      existingUser,
      token
    })
  }
  else{
    res.status(406).json('Incorrect email id or password')
  }}catch(err){
    res.status(401).json(`login failed due ${err}`)
  }
  
  
}

//edit profile
exports.editUser = async(req,res)=>{
  const userId = req.payload
  const {username,email,password,github,linkedin,profile} = req.body
  const profileImage = req.file?req.file.filename:profile

  try {
      const updateUser = await users.findByIdAndUpdate({_id:id},{username,email,password,github,linkedin,profile:profileImage},{new:true})
      await updateUser.save()
      res.status(200).json(updateUser)
  } catch (err) {
    res.status(401).json(err)
  }
}