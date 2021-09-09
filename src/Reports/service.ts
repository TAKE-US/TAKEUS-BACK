import Report from "../models/Report";
import { SC } from "../utils/statusCode";

class ReportService {
  async readAll() {
    const reports = await Report.find()
      .populate("targetUser")
      .populate("reportUser")
      .populate("targetDog")
      .populate("targetReview")
      .sort({ reportDate:-1 });
    const totalNum = await Report.countDocuments({});

    return { statusCode: SC.SUCCESS, json: { data: reports, totalNum: totalNum } };
  }

  async create({
    user,
    targetUser,
    targetDog,
    targetReview,
  }) {
    const report = new Report({
      reportUser: user.id,
      targetUser: targetUser,
      targetDog: targetDog,
      targetReview: targetReview,
    })
    
    await report.save();

    return { statusCode: SC.SUCCESS, json: { data: report } };
  }
}

export default new ReportService();
