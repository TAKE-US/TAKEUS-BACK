import { Router, Request, Response } from "express";

import auth from "../middleware/auth";
import Report from "../models/Report";

const router = Router();

/**
 *  @route POST api/reports
 *  @desc Create one report
 *  @access Private
 */
router.post(
  "/",
  auth,
  async (req, res) => {
    const {
      user,
      targetUser,
      targetReview,
    } = req.body;

    const report = new Report({
      reportUser: user.id,
      targetUser: targetUser,
      targetReview: targetReview,
  })

    console.log(report);

    try {
      await report.save();

      console.log("DB 저장완료");
      res.status(200).json(report);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error.");
    }
  }
);

/**
 *  @route GET api/reports
 *  @desc Get all reports order by date
 *  @access Public
 */
 router.get("/", async (req: Request, res: Response) => {
  try {
    
    const reports = await Report.find().populate("targetUser").populate("targetReview").sort({"reportDate":-1});
    const totalNum = await Report.countDocuments({});

    res.status(200).json({ data: reports, totalNum: totalNum });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
