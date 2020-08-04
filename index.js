const express = require("express");
const shortid = require("shortid");
const server = express();

server.use(express.json());


let users = [
    {
    id: {
        type: String,
        'default':shortid.generate
    },
    name: "Jane Doe",
    bio: "Not Tarzan's Wife, another Jane",
  }
];

// GET    | /api/users     | Returns an array users.                                                                                |
// | GET    | /api/users/:id | Returns the user object with the specified `id`.      

server.get("/api/users", (req, res) => {
    if (!users) {
        res.status(500).json(`{ errorMessage: "The users information could not be retrieved." }`)
    } else {
        res.status(200).json({users});
    }
});

server.get("/api/users/:id", (req, res) => {
    
    const user = users.find(user => user.id === req.params.id)
    if(user) {
      res.status(200).json({user});
    } else {
      res.status(404).json(`{ message: "The user with the specified ID does not exist." }`);
    }
    
});


//POST;  400 error and 201 

server.post("/api/users", (req, res) => {
    const postUser = req.body;
    if(!postUser.name || !postUser.bio){
      res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    } else {
      postUser.id = shortid.generate();
      users.push(postUser);
      res.status(201).json(users)
    }
});

server.delete("/api/users/:id", (req,res) => {
    const user = users.find(user => user.id === req.params.id)
    if(user) {
      users = users.filter(u => u.id !== user.id)
      res.status(200).json(users)
    } else {
      res.status(404).json(`{ message: "The user with the specified ID does not exist." }`)
    };
});

server.patch('/api/users/:id', (req,res) => {
    let patchUser = users.find(user => user.id === req.params.id)
    const patch = req.body
    if (!req.body.name || !req.body.bio) {
      res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    } else if (patchUser) {
      Object.assign(patchUser, patch)
      res.status(200).json({patchUser})
    } else {
      res.status(404).json({ message: "The user with the specified ID does not exist." })
    }
  })




const port = 8001

server.listen(port, () => 
console.log(`Running on port ${port}`)
);
