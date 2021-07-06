import { Router, Request, Response } from "express";
import Dog from "../models/Dog";

const router = Router();

/**
 *  @route GET api/dogs
 *  @desc Get all dogs
 *  @access Public
 */
router.get("/", async (req: Request, res: Response) => {
  try {
    const dogs = await Dog.find();
    res.json(dogs);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;