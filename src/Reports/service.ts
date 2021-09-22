import Report from "../models/Report";
import Dog from "../models/Dog";
import Review from "../models/Review";
import { SC } from "../utils/statusCode";
import { RM } from "../utils/responseMessage";

class ReportService {
  async readAll() {
    const reports = await Report.find()
      .populate("targetUser")
      .populate("reportUser")
      .populate("targetDog")
      .populate("targetReview")
      .sort({ reportDate: -1 });
    const totalNum = await Report.countDocuments({});

    return {
      statusCode: SC.SUCCESS,
      json: { data: reports, totalNum: totalNum },
    };
  }

  async create({ user, targetUser, targetDog, targetReview }) {
    if (targetDog) {
      let dog = null;
      try {
        dog = await Dog.findOne({ _id: targetDog, status: { $ne: "deleted" } });
      } catch (error) {
        if (error.name == "CastError") {
          return {
            statusCode: SC.BAD_REQUEST,
            json: { error: RM.INVALID_DOG_ID },
          };
        } else {
          throw error;
        }
      }

      if (!dog) {
        return { statusCode: SC.NOT_FOUND, json: { error: RM.DOG_NOT_FOUND } };
      }

      const isDuplicated = await Report.find()
        .where("reportUser")
        .equals(user.id)
        .where("targetDog")
        .equals(targetDog);

      if (!(isDuplicated.length === 0)) {
        return {
          statusCode: SC.BAD_REQUEST,
          json: { error: RM.DUPLICATE_REPORT },
        };
      } else {
        const report = new Report({
          reportUser: user.id,
          targetUser: targetUser,
          targetDog: targetDog,
        });

        await report.save();

        return { statusCode: SC.SUCCESS, json: { data: report } };
      }
    } else if (targetReview) {
      let review = null;
      try {
        review = await Review.findOne({ _id: targetReview });
      } catch (error) {
        if (error.name == "CastError") {
          return {
            statusCode: SC.BAD_REQUEST,
            json: { error: RM.INVALID_REVIEW_ID },
          };
        } else {
          throw error;
        }
      }

      if (!review) {
        return {
          statusCode: SC.NOT_FOUND,
          json: { error: RM.REVIEW_NOT_FOUND },
        };
      }

      const isDuplicated = await Report.find()
        .where("reportUser")
        .equals(user.id)
        .where("targetReview")
        .equals(targetReview);

      if (!(isDuplicated.length === 0)) {
        return {
          statusCode: SC.BAD_REQUEST,
          json: { error: RM.DUPLICATE_REPORT },
        };
      } else {
        const report = new Report({
          reportUser: user.id,
          targetUser: targetUser,
          targetReview: targetReview,
        });

        await report.save();

        return { statusCode: SC.SUCCESS, json: { data: report } };
      }
    }
  }
}

export default new ReportService();
