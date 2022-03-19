import { Router, Request, Response } from "express";
import ReviewService from "./service";
import { SC } from "../utils/statusCode";
import { RM } from "../utils/responseMessage";

class ReviewController {
  async readAll(req: Request, res: Response, next) {
    const { order = "latest", page = 1, postNumInPage = 7 } = req.query;

    ReviewService.readAll(order, page, postNumInPage)
      .then((result) => {
        res.status(result.statusCode).send(result.json);
      })
      .catch((err) => {
        next(err);
      });
  }

  async readOne(req: Request, res: Response, next) {
    const reviewId = req.params.reviewId;
    ReviewService.readOne(reviewId)
      .then((result) => {
        res.status(result.statusCode).send(result.json);
      })
      .catch((err) => {
        console.log(err);

        if (err.name === "CastError") {
          res.status(SC.BAD_REQUEST).send({ error: RM.INVALID_REVIEW_ID });
        } else {
          next(err);
        }
      });
  }

  async searchKeyword(req: Request, res: Response, next) {
    const { order = "latest", page = 1, postNumInPage = 7 } = req.query;
    const keyword = req.params.keyword;

    ReviewService.searchKeyword(order, page, postNumInPage, keyword)
      .then((result) => {
        res.status(result.statusCode).send(result.json);
      })
      .catch((err) => {
        next(err);
      });
  }

  async filter(req: Request, res: Response, next) {
    const {
      order = "latest",
      hashtags,
      page = 1,
      postNumInPage = 7,
    } = req.query;
    const endingAirport = req.params.endingAirport;

    ReviewService.filter(order, hashtags, page, postNumInPage, endingAirport)
      .then((result) => {
        res.status(result.statusCode).send(result.json);
      })
      .catch((err) => {
        next(err);
      });
  }

  async findMy(req: Request, res: Response, next) {
    const { order = "latest", page = 1, postNumInPage = 5 } = req.query;
    const userId = req.body.user.id;

    ReviewService.findMy(order, page, postNumInPage, userId)
      .then((result) => {
        res.status(result.statusCode).send(result.json);
      })
      .catch((err) => {
        next(err);
      });
  }

  async create(req: Request, res: Response, next) {
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

    if (
      !title ||
      !endingCountry ||
      !endingAirport ||
      !hashtags ||
      !content ||
      !user
    ) {
      res.status(SC.BAD_REQUEST).send({ error: RM.NULL_VALUE });
      return;
    }

    ReviewService.create({
      title,
      endingCountry,
      endingAirport,
      hashtags,
      isInstitution,
      institutionName,
      content,
      user,
    })
      .then((result) => {
        res.status(result.statusCode).send(result.json);
      })
      .catch((err) => {
        next(err);
      });
  }

  async update(req: Request, res: Response, next) {
    const reviewId = req.params.reviewId;

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

    if (
      !title ||
      !endingCountry ||
      !endingAirport ||
      !hashtags ||
      !content ||
      !user
    ) {
      res.status(SC.BAD_REQUEST).send({ error: RM.NULL_VALUE });
      return;
    }

    ReviewService.update({
      title,
      endingCountry,
      endingAirport,
      hashtags,
      isInstitution,
      institutionName,
      content,
      user,
      reviewId,
    })
      .then((result) => {
        res.status(result.statusCode).send(result.json);
      })
      .catch((err) => {
        next(err);
      });
  }

  async delete(req: Request, res: Response, next) {
    const user = req.body.user;
    const reviewId = req.params.reviewId;

    ReviewService.delete(user, reviewId)
      .then((result) => {
        res.status(result.statusCode).send(result.json);
      })
      .catch((err) => {
        next(err);
      });
  }
}

export default new ReviewController();
