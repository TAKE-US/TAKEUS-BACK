import { Router, Request, Response } from "express";

import Review from "../models/Review";
import { IReviewInputDTO } from "../interfaces/IReview";

import { calculateSKipAndLimit } from "../utils/paging";

import aws from "../middleware/aws";
import auth from "../middleware/auth";
import { crawling } from "../utils/crawling";

const router = Router();


/**
 *  @route GET api/reviews
 *  @desc Get all reviews order by date
 *  @access Public
 */
router.get("/", async (req: Request, res: Response) => {
  try {
    const orderHash = { latest: -1, oldest: 1, undefined: -1 };

    const order: any = req.query.order;
    const { page = 1, postNumInPage = 7 } = req.query;

    const { skip, limit } = calculateSKipAndLimit(
      page as any as number,
      postNumInPage as any as number
    );

    const reviews = await Review.find()
      .sort({ writeDate: orderHash[order] })
      .skip(skip)
      .limit(limit);
    const totalNum = await Review.countDocuments({});

    res.status(200).json({ data: reviews, totalNum: totalNum });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

/**
 *  공항이름, 태그이름
 *  @route GET api/reviews/:keyword
 *  @desc Get all reviews filterd by keyword
 *  @access Public
 */
 router.get("/:keyword", async (req: Request, res: Response) => {
  try {
    const orderHash = { latest: -1, oldest: 1, undefined: -1 };

    const order: any = req.query.order;
    const { page = 1, postNumInPage = 7 } = req.query;

    const { skip, limit } = calculateSKipAndLimit(
      page as any as number,
      postNumInPage as any as number
    );

    const reviews = await Review.find().or([
      { endingAirport: { $regex: req.params.keyword } },
      { hashtags: {$regex: req.params.keyword } },
    ])
      .sort({ writeDate: orderHash[order] })
      .skip(skip)
      .limit(limit);
    const totalNum = await Review.countDocuments({});

    res.status(200).json({ data: reviews, totalNum: totalNum });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

/**
 *  @route GET api/reviews/:endingAirport
 *  @desc Get all reviews filterd by endingAirport,hashtags
 *  @access Public
 */
 router.get("/search/:endingAirport", async (req: Request, res: Response) => {
  try {
    const orderHash = { latest: -1, oldest: 1, undefined: -1 };

    const order: any = req.query.order;
    const hashtags: any = req.query.hashtags;
    const { page = 1, postNumInPage = 7 } = req.query;

    const { skip, limit } = calculateSKipAndLimit(
      page as any as number,
      postNumInPage as any as number
    );

    const reviews = await Review.find({
      endingAirport: req.params.endingAirport,
      hashtags: hashtags,
    })
      .sort({ writeDate: orderHash[order] })
      .skip(skip)
      .limit(limit);
    const totalNum = await Review.countDocuments({});

    res.status(200).json({ data: reviews, totalNum: totalNum });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
