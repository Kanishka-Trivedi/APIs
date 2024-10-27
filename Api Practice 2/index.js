const express = require("express");
const app = express();
app.use(express.json()); 

const cors = require("cors");
app.use(cors());

let courses = {
    frontend: {
      title: "Frontend Development",
      description: "Learn HTML, CSS, JavaScript...",
      ratings: [5, 4, 4.5],
    },
    backend: {
      title: "Backend Development",
      description: "Learn Node, Express, Database",
      ratings: [5, 5, 4.9],
    },
  };

  app.get("/courses", (req, res) => {
    res.json(courses);
  });

  app.get("/courses/:name", (req, res) => {
    const course = courses[req.params.name];
    if (course) {
      res.json(course);
    } else {
      res.status(404).send("Course not found");
    }
  });

  app.get("/courses/:name/description", (req, res) => {
    const course = courses[req.params.name];
    if (course) {
      res.json({ description: course.description });
    } else {
      res.status(404).send("Course not found or no ratings available");
    }
  });

  app.get("/courses/:name/rating", (req, res) => {
    const course = courses[req.params.name];
    if (course && course.ratings.length > 0) {
      const sum =
        course.ratings.reduce((acc, r) => acc + r, 0);
      res.json({ sumOfRatings: sum });
    } else {
      res.status(404).send("Course not found or no ratings available");
    }
  });

  app.post("/courses", (req, res) => {
    const { name, title, description, ratings } = req.body;
    if (courses[name]) {
      return res.status(400).send("Course already exists");
    }
    courses[name] = { title, description, ratings };
    res.status(201).send(`Course ${name} created`);
  });

  app.post("/courses/:name/rating", (req, res) => {
    const course = courses[req.params.name];
    if (course) {
      course.ratings.push(req.body.rating);
      res.send("Rating added");
    } else {
      res.status(404).send(`"Course not found"`);
    }
  });

  app.put("/courses/:name", (req, res) => {
    const { title, description } = req.body;
    if (courses[req.params.name]) {
      courses[req.params.name].title = title;
      courses[req.params.name].description = description;
      res.send("Course updated");
    } else {
      res.status(404).send("Course not found");
    }
  });

  const PORT = 5000;
  app.listen(PORT, () =>{
     console.log(`Server running in port ${PORT}`);
  });