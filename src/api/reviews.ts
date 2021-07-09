import { Router, Request, Response } from "express";

import Review from "../models/Review";
import { IReviewInputDTO } from "../interfaces/IReview";

import { calculateSKipAndLimit } from "../utils/paging";

import aws from "../middleware/aws";
import auth from "../middleware/auth";

const router = Router();

/**
 *  @route POST api/reviews
 *  @desc Create one review
 *  @access Private
 */
router.post(
  "/",
  auth,
  async (req, res) => {
    const {
      user,
      title,
      endingCountry,
      endingAirport,
      hashtags,
      isInstitution,
      institutionName,
      content,
    } = req.body;

    let reviewFields: IReviewInputDTO = {
      user: user.id,
    };
    if (title) reviewFields.title = title;
    if (endingCountry) reviewFields.endingCountry = endingCountry;
    if (endingAirport) reviewFields.endingAirport = endingAirport;
    if (hashtags) reviewFields.hashtags = hashtags;
    if (isInstitution) reviewFields.isInstitution = isInstitution;
    if (institutionName) reviewFields.institutionName = institutionName;
    if (content) reviewFields.content = content;

    try {
      // Create
      let review = new Review(reviewFields);
      await review.save();

      res.status(200).json(review);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error.");
    }
  }
);

module.exports = router;
