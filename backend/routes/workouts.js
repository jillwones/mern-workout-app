const express = require("express");
const WorkoutController = require("../controllers/workouts");
const router = express.Router();

// GET all workouts
router.get("/", WorkoutController.AllWorkouts);

// GET a single workout
router.get("/:id", WorkoutController.getWorkout);

// POST a new workout
router.post("/", WorkoutController.Create);

// DELETE a workout
router.delete("/:id", WorkoutController.deleteWorkout);

// UPDATE a workout
router.patch("/:id", WorkoutController.updateWorkout);

module.exports = router;
