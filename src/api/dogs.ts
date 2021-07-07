import { Router, Request, Response } from "express";
import Dog from "../models/Dog";

const router = Router();

/**
 *  @route GET api/dogs
 *  @desc Get all dogs order by date
 *  @access Public
 */
router.get("/", async (req: Request, res: Response) => {
  try {
    const dogs = await Dog.find().sort('registerDate');
    const totalNum = dogs.length;

    const response = { data: dogs, totalNum: totalNum };
    res.json(response);

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

/**
 *  @route GET api/dogs/detail/:dogId
 *  @desc Get one dog with matching id.
 *  @access Public
 */
 router.get("/detail/:dogId", async (req: Request, res: Response) => {
  try {
    const dogId = req.params.dogId;
    const dog = await Dog.findOne({_id: dogId});

    if (!dog) return res.status(400).json({ status: 400, msg: "Dog not found" });

    const response = { data: dog };
    res.status(200).json(response);

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
