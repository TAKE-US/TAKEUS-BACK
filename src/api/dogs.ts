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
    const dogs = await Dog.find({ status: 'wating' }).sort('registerDate');
    const totalNum = dogs.length;

    const response = { data: dogs, totalNum: totalNum };
    
    res.json(response);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

/**
 *  @route GET api/dogs/search/:endingAirport
 *  @desc Get all dogs filterd by airport (오래된순)
 *  @access Public
 */
 router.get("/search/:endingAirport", async (req: Request, res: Response) => {
  try {
    const searchedDog = await Dog.find({ endingAirport: req.params.endingAirport, status: 'wating' }).sort('registerDate');

    res.json(searchedDog);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
