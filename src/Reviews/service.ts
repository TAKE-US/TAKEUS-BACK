import Review from "../models/Review";
import { IReviewInputDTO } from "../interfaces/IReview";
import { SC } from "../utils/statusCode";
import { RM } from "../utils/responseMessage";
import { calculateSKipAndLimit } from "../utils/paging";

const orderHash = { latest: -1, oldest: 1, undefined: 1 };
const axios = require("axios");
const cheerio = require("cheerio");

class ReviewService {
  async readAll(order, page, postNumInPage) {
    const { skip, limit } = calculateSKipAndLimit(
      page as number,
      postNumInPage as number
    );

    const reviews = await Review.find()
      .sort({ writeDate: orderHash[order] })
      .skip(skip)
      .limit(limit);
    const totalNum = await Review.countDocuments({});

    return { statusCode: SC.SUCCESS, json: { data: reviews, totalNum: totalNum } };
  }

  async readOne(reviewId) {
    const review = await Review.findOne({ _id: reviewId });

    if (!review) {
      return { statusCode: SC.NOT_FOUND, json: { error: RM.REVIEW_NOT_FOUND } };
    }

    return { statusCode: SC.SUCCESS, json: { data: review } };
  }

  async searchKeyword(order, page, postNumInPage, keyword) {
    const { skip, limit } = calculateSKipAndLimit(
      page as number,
      postNumInPage as number
    );

    const reviews = await Review.find()
      .or([
        { endingAirport: keyword },
        { hashtags: keyword },
      ])
      .sort({ writeDate: orderHash[order] })
      .skip(skip)
      .limit(limit);
    const totalNum = await Review.countDocuments({}).or([
      { endingAirport: keyword },
      { hashtags: keyword },
    ]);

    return { statusCode: SC.SUCCESS, json: { data: reviews, totalNum: totalNum } };
  }

  async findMy(order, page, postNumInPage, userId) {
    const { skip, limit } = calculateSKipAndLimit(
      page as number,
      postNumInPage as number
    );

    const reviews = await Review.find({
      user: userId,
    })
      .sort({ writeDate: orderHash[order] })
      .skip(skip)
      .limit(limit);

    const totalNum = await Review.countDocuments({
      user: userId,
    });

    return { statusCode: SC.SUCCESS, json: { data: reviews, totalNum: totalNum } };
  }

  async create({
    title,
    endingCountry,
    endingAirport,
    hashtags,
    isInstitution,
    institutionName,
    content,
    user,
  }) {
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

    // Create
    let review = new Review(reviewFields);
    // Crawling
    axios
      .get(content)
      .then((html) => {
        const $ = cheerio.load(html.data);
        const $bodyList = $("head");
        $bodyList.each(function (i, elem) {
          (add.link = $(this).find('meta[property="og:url"]').attr("content")),
            (add.image = $(this)
              .find('meta[property="og:image"]')
              .attr("content")),
            (add.desc = $(this)
              .find('meta[property="og:description"]')
              .attr("content"));

          review.crawlingData.unshift(add);
          review.save();
        });
      })

    return { statusCode: SC.SUCCESS, json: { data: review } };
  }

  async update({
    title,
    endingCountry,
    endingAirport,
    hashtags,
    isInstitution,
    institutionName,
    content,
    user,
    reviewId,
  }) {
    let review = await Review.findOne({ _id: reviewId });

    if (!review) {
      return { statusCode: SC.NOT_FOUND, json: { error: RM.REVIEW_NOT_FOUND } };
    }

    const owner = review.user;

    if (user.id != owner) {
      return { statusCode: SC.FORBIDDEN, json: { error: RM.NO_AUTHENTICATED } };
    }
    
    const add = {
      link: null,
      desc: null,
      image: null,
    };

    if (title) review.title = title;
    if (endingCountry) review.endingCountry = endingCountry;
    if (endingAirport) review.endingAirport = endingAirport;
    if (hashtags) review.hashtags = hashtags;
    if (isInstitution) review.isInstitution = isInstitution;
    if (institutionName) review.institutionName = institutionName;
    if (content) review.content = content;

    // Update
    await review.save();

    // Crawling
    axios
      .get(content)
      .then((html) => {
        const $ = cheerio.load(html.data);
        const $bodyList = $("head");
        $bodyList.each(function (i, elem) {
          (add.link = $(this).find('meta[property="og:url"]').attr("content")),
            (add.image = $(this)
              .find('meta[property="og:image"]')
              .attr("content")),
            (add.desc = $(this)
              .find('meta[property="og:description"]')
              .attr("content"));

          review.crawlingData.splice(0, 1);
          review.crawlingData.unshift(add);
          review.save();
        });
      })

    return { statusCode: SC.SUCCESS, json: { data: review } };
  }

  async delete(user, reviewId) {
    let review = await Review.findOne({ _id: reviewId });
    
    if (!review) {
      return { statusCode: SC.NOT_FOUND, json: { error: RM.REVIEW_NOT_FOUND } };
    }
    
    const owner = review.user;

    if (user.id != owner) {
      return { statusCode: SC.FORBIDDEN, json: { error: RM.NO_AUTHENTICATED } };
    }

    await review.remove();

    return { statusCode: SC.SUCCESS, json: { data: "deleted" } };
  }
}

export default new ReviewService();
