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
 *  @desc Get all dogs filterd by airport
 *  @access Public
 */
 router.get("/search/:endingAirport", async (req: Request, res: Response) => {
  try {
    const query = req.query;
    let searchedDog;
    if (query.order === 'oldest') {
      //오래된순
      //GET /api/dogs/search/:endingAirport?order=oldest
      searchedDog = await Dog.find({ endingAirport: req.params.endingAirport, status: 'wating' }).sort('registerDate');
    } else if (query.order === 'latest') {
      //최신순
      //GET /api/dogs/search/:endingAirport?order=latest
      searchedDog = await Dog.find({ endingAirport: req.params.endingAirport, status: 'wating' }).sort({ registerDate: -1 });
    }

    res.json(searchedDog);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
