const express = require("express");
const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

let studentsData = {
    "Rahul Sharma": {
      email: "rahul.sharma@codinggita.com",
      websites: [
        "http://rahuls-portfolio.com",
        "http://rahulblogs.com",
        "http://rahulprojects.com"
      ]
    },
    "Anjali Mehta": {
      email: "anjali.mehta@codinggita.com",
      websites: [
        "http://anjalisdesigns.com",
        "http://anjalitech.com",
        "http://anjalicode.com"
      ]
    }
  };


  app.get("/studentsData", (req, res) => {
    res.json(studentsData);
  });

  app.get("/studentsData/:name", (req, res) => {
    const course = studentsData[req.params.name];
    if (course) {
      res.json(course);
    } else {
      res.status(404).send("Student not found");
    }
  });

  app.get("/studentsData/:name/email", (req, res) => {
    const studentEmails = studentsData[req.params.name];
    if (studentEmails) {
      res.json({email : studentEmails.email});
    } else {
      res.status(404).send("Email not found");
    }
  });

  app.post("/studentsData", (req, res) => {
    const { name, email, websites } = req.body;
    if (studentsData[name]) {
      return res.status(400).send("Student already exists");
    }
    studentsData[name] = {email, websites };
    res.status(201).send(`Student ${name} created`);
  });

  app.post("/studentsData/:name/websites", (req, res) => {
    const website = studentsData[req.params.name];
    if (website) {
      website.websites.push(req.body.websites);
      res.send("Website added");
    } else {
      res.status(404).send("Student not found");
    }
  });

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});