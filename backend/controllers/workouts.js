const Workout = require("../models/workout");
const mongoose = require("mongoose");

const WorkoutController = {
  // create a new workout

  Create: async (req, res) => {
    const { title, load, reps } = req.body;

    let emptyFields = [];

    if (!title) {
      emptyFields.push("title");
    }
    if (!load) {
      emptyFields.push("load");
    }
    if (!reps) {
      emptyFields.push("reps");
    }
    if (emptyFields.length > 0) {
      return res.status(400).json({error: "Please fill in all the fields.", emptyFields})
    }
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

  // delete a workout

  deleteWorkout: async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such workout" });
    }

    const workout = await Workout.findOneAndDelete({ _id: id });

    if (!workout) {
      return res.status(400).json({ error: "No such workout" });
    }

    res.status(200).json(workout);
  },

  // update a workout

  updateWorkout: async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such workout" });
    }

    const workout = await Workout.findByIdAndUpdate(
      { _id: id },
      {
        ...req.body,
      }
    );

    if (!workout) {
      return res.status(400).json({ error: "No such workout" });
    }

    res.status(200).json(workout);
  },
};

module.exports = WorkoutController;
