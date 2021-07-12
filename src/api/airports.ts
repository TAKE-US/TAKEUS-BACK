import { Router, Request, Response } from "express";
import Airport from "../models/Airport";

const router = Router();

/**
 *  @route GET api/airports/country
 *  @desc Get airports of the country
 *  @access Public
 */
router.get("/country", async (req: Request, res: Response) => {
  try {
    const airports = await Airport.findOne();

    res.json(airports);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;