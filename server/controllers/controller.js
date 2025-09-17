import Questions from "../models/questionSchema.js";
import Results from "../models/resultSchema.js";
import questions, { answers } from '../database/data.js'

/** get all questions */
export async function getQuestions(req, res){
    try {
        const q = await Questions.find();
        res.json(q)
    } catch (error) {
        res.json({ error })
    }
}

/** insert all questions */
export async function insertQuestions(req, res) {
  try {
    // ek hi document me pura data insert karo
    await Questions.insertMany([
      {
        questions: questions, // questions array from data.js
        answers: answers      // answers array from data.js
      }
    ]);

    res.status(201).json({ msg: "Data Saved Successfully!" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

/** Delete all Questions */
export async function dropQuestions(req, res){
   try {
        await Questions.deleteMany();
        res.json({ msg: "Questions Deleted Successfully...!"});
   } catch (error) {
        res.json({ error })
   }
}

/** get all result */
export async function getResult(req, res){
    try {
        const r = await Results.find();
        res.json(r)
    } catch (error) {
        res.json({ error })
    }
}

/** post all result */
export async function storeResult(req, res) {
  try {
    const { username, result, attempts, points, achived } = req.body;

    if (!username && !result) {
      return res.status(400).json({ error: "Data Not Provided...!" });
    }

    // async/await version without callback
    await Results.create({ username, result, attempts, points, achived });

    res.status(201).json({ msg: "Result Saved Successfully...!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

/** delete all result */
export async function dropResult(req, res){
    try {
        await Results.deleteMany();
        res.json({ msg : "Result Deleted Successfully...!"})
    } catch (error) {
        res.json({ error })
    }
}