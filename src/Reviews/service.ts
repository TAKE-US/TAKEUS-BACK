import Review from "../models/Review";
import { SC } from "../utils/statusCode";
import { RM } from "../utils/responseMessage";
import { calculateSKipAndLimit } from "../utils/paging";

const orderHash = { latest: -1, oldest: 1, undefined: 1 };

class ReviewService {
  async readAll(order, page, postNumInPage) {
    const { skip, limit } = calculateSKipAndLimit(
      page as any as number,
      postNumInPage as any as number
    );

    const reviews = await Review.find()
      .sort({ writeDate: orderHash[order] })
      .skip(skip)
      .limit(limit);
    const totalNum = await Review.countDocuments({});

    return { statusCode: SC.SUCCESS, json: { data: reviews, totalNum: totalNum } };
  }

}

export default new ReviewService();
