const Workout = require("../models/workout");
const mongoose = require("mongoose");

const WorkoutController = {
  // create a new workout

  Create: async (req, res) => {
    const { title, load, reps } = req.body;
   
    try {
      const workout = await Workout.create({ title, load, reps });
      res.status(200).json(workout);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // get all workouts

  AllWorkouts: async (req, res) => {
    const workouts = await Workout.find({}).sort({ createdAt: -1 });

    res.status(200).json(workouts);
  },

  // get a single workout

  getWorkout: async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such workout" });
    }

    const workout = await Workout.findById(id);

    if (!workout) {
      return res.status(404).json({ error: "No such workout" });
    }

    res.status(200).json(workout);
  },
};

module.exports = WorkoutController;
