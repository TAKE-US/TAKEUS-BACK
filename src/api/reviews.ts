import { Router, Request, Response } from "express";

import Review from "../models/Review";
import { IReviewInputDTO } from "../interfaces/IReview";

import { calculateSKipAndLimit } from "../utils/paging";

import auth from "../middleware/auth";

const router = Router();
const puppeteer = require("puppeteer");
const cheerio = require('cheerio');

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
    const totalNum = await Review.countDocuments({}).or([
      { endingAirport: { $regex: req.params.keyword } },
      { hashtags: {$regex: req.params.keyword } },
    ]);

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
    const totalNum = await Review.countDocuments({
      endingAirport: req.params.endingAirport,
      hashtags: hashtags,
    });

    res.status(200).json({ data: reviews, totalNum: totalNum });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

/**
 *  @route GET api/reviews/my
 *  @desc Get my reviews
 *  @access Private
 */
 router.get("/my", auth, async (req: Request, res: Response) => {
  try {
    const { page = 1, postNumInPage = 5 } = req.query;

    const { skip, limit } = calculateSKipAndLimit(
      page as any as number,
      postNumInPage as any as number
    );

    const reviews = await Review.find({
      user: req.body.user.id,
    })
      .sort({ writeDate: -1 })
      .skip(skip)
      .limit(limit);

    const totalNum = await Review.countDocuments({
      user: req.body.user.id,
    });

    res.status(200).json({ data: reviews, totalNum: totalNum });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

/**
 *  @route POST api/reviews
 *  @desc Create reviews
 *  @access Private
*/
router.post(
  "/",
  auth,
  async (req: Request, res: Response) => {
    const extractData = html => {

      const $ = cheerio.load(html);
      const $items = $('head');
      $items.each(function (i, elem) {
          add.link = $(this).find('meta[property="og:url"]').attr('content');
          add.image = $(this).find('meta[property="og:image"]').attr('content');
          add.desc = $(this).find('meta[property="og:description"]').attr('content');
      });
    }
  
    const browserOption = {
      headless : true,
    };
    const browser = await puppeteer.launch(browserOption);
    const page = await browser.newPage();

    const {
      title,
      endingCountry,
      endingAirport,
      hashtags,
      isInstitution,
      institutionName,
      content,
      user,
    } = req.body;

    const add = {
      link: null,
      desc: null,
      image: null,
    };

    // Build review object
    let reviewFields: IReviewInputDTO = {
      user: user.id,
    };
    if (title) reviewFields.title = title;
    if (endingCountry) reviewFields.endingCountry = endingCountry;
    if (endingAirport) reviewFields.endingAirport = endingAirport;
    if (isInstitution) reviewFields.isInstitution = isInstitution;
    if (institutionName) reviewFields.institutionName = institutionName;
    if (hashtags) reviewFields.hashtags = hashtags;
    if (content) reviewFields.content = content;
    
    // Build crawlingData object
    if (add.link) reviewFields.crawlingData.link = add.link;
    if (add.image) reviewFields.crawlingData.image = add.image;
    if (add.desc) reviewFields.crawlingData.desc = add.desc;

    try {
      // Crawling
      const url = req.body.content;
      const response = await page.goto(url);
      const html = await response.text();
      extractData(html);

      //Create
      let review = new Review(reviewFields);
      await review.save();

      review = await Review.findOne({ _id: review.id });
      review.crawlingData.unshift(add);
      await review.save();

      res.json(review);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
