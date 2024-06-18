const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const usermodel=require('./models/usermodel')

const app = express();


app.use(express.json()); 
app.use(cors()); 


app.post("/", (req, res) => {
    const { email, password } = req.body;
    usermodel.findOne({ email: email })
        .then(user => {
            if (user) {
                // User found, now check password
                if (user.password === password) {
                    // Password matches
                    res.json({ success: true, message: "Login successful" });
                } else {
                    // Password does not match
                    res.status(401).json({ success: false, message: "The password is incorrect" });
                }
            } else {
                // User not found
                res.status(404).json({ success: false, message: "User not found" });
            }
        })
        .catch(err => {
            console.error("Error during login:", err);
            res.status(500).json({ success: false, message: "Internal Server Error" });
        });
});




app.post("/register", (req, res) => {
    const { name,email,number, password } = req.body;

    usermodel.findOne({ email: email })
        .then(user => {
            if (user) {
                
                res.json({ success: false, message: "User already exists" });
            } else {
                
                usermodel.create({ name,email,number, password })
                    .then(() => {
                        res.json({ success: true, message: "Registration successful" });
                    })
                    .catch(err => {
                        console.error("Error during registration:", err);
                        res.json({ success: false, message: "Failed to register user" });
                    });
            }
        })
        .catch(err => {
            console.error("Error during user lookup:", err);
            res.status(500).json({ success: false, message: "Internal Server Error" });
        });
});






mongoose.connect("mongodb+srv://admin:admin@backenddb.7wgh4tq.mongodb.net/?retryWrites=true&w=majority&appName=backenddb")
.then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

app.listen(3001,()=>{
    console.log("server is running")
})