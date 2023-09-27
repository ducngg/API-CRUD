const express = require('express');
const router = express.Router();


let users = [
    {
        firstName: "John",
        lastName: "wick",
        email:"johnwick@gamil.com",
        DOB:"22-01-1990",
    },
    {
        firstName: "John",
        lastName: "smith",
        email:"johnsmith@gamil.com",
        DOB:"21-07-1983",
    },
    {
        firstName: "Joyal",
        lastName: "white",
        email:"joyalwhite@gamil.com",
        DOB:"21-03-1989",
    },
];

// GET request: Retrieve all users
router.get("/",(req,res)=>{
  res.send(JSON.stringify({users}, null, 2));
});

// GET by specific ID request: Retrieve a single user with email ID
router.get("/:email",(req,res)=>{
  const email = req.params.email;
  const filtered_users = users.filter((user) => user.email === email);
  if (filtered_users.length > 0) {
    res.send(filtered_users);
  } else {
    res.send("No user with that email!");
  }
});

// POST request: Create a new user
router.post("/",(req,res)=>{
  users.push({
    "firstName":req.query.firstName,
    "lastName":req.query.lastName,
    "email":req.query.email,
    "DOB":req.query.DOB
  });
  res.send("User "+ (req.query.firstName) + " has been added!")
});


// PUT request: Update the details of a user by email ID
router.put("/:email", (req, res) => {
    const email = req.params.email;
    let filtered_users = users.filter((user) => user.email === email);
    if (filtered_users.length > 0) {
        let filtered_user = filtered_users[0];
        if (req.query.DOB) {
            filtered_user.DOB = req.query.DOB;
        }
        if (req.query.firstName) {
            filtered_user.DOB = req.query.firstName;
        }
        if (req.query.lastName) {
            filtered_user.DOB = req.query.lastName;
        }
        users = users.filter((user) => user.email != email);
        users.push(filtered_user);
        res.send(`User with the email ${email} updated.`);
    }
    else {
        res.send("Unable to find user!");
    }
  });


// DELETE request: Delete a user by email ID
router.delete("/:email", (req, res) => {
  const email = req.params.email;
  users = users.filter((user) => user.email != email);
  res.send(`User with the email  ${email} deleted.`);
});

module.exports=router;
