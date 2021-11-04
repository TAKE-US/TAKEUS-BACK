import { Router, Request, Response } from "express";
import DogService from "./service";
import { SC } from "../utils/statusCode";
import { RM } from "../utils/responseMessage";

class DogController {
  async readAll(req: Request, res: Response, next) {
    // data의 입력과 출력만 있음.
    const { order = "latest", page = 1, postNumInPage = 16 } = req.query;

    DogService.readAll(order, page, postNumInPage)
      .then((result) => {
        res.status(result.statusCode).send(result.json);
      })
      .catch((err) => {
        next(err);
      });
  }

  async readOne(req: Request, res: Response, next) {
    const dogId = req.params.dogId;
    const user = req.body.user;

    DogService.readOne(dogId, user)
      .then((result) => {
        res.status(result.statusCode).send(result.json);
      })
      .catch((err) => {
        if (err.name === "CastError") {
          res.status(SC.BAD_REQUEST).send({ error: RM.INVALID_DOG_ID });
        } else {
          next(err);
        }
      });
  }

  async create(req: Request, res: Response, next) {
    const {
      endingCountry,
      endingAirport,
      name,
      gender,
      age,
      weight,
      neutralization,
      health,
      isInstitution,
      institutionName,
      kakaotalkId,
      phoneNumber,
      instagram,
      twitter,
      facebook,
      detail,
      photos,
      user,
    } = req.body;

    if (
      !endingCountry ||
      !endingAirport ||
      !name ||
      !gender ||
      !weight ||
      !neutralization ||
      !health ||
      !isInstitution ||
      !institutionName ||
      !user
    ) {
      res.status(SC.BAD_REQUEST).send({ error: RM.NULL_VALUE });
      return;
    }

    DogService.create({
      endingCountry,
      endingAirport,
      name,
      gender,
      age,
      weight,
      neutralization,
      health,
      isInstitution,
      institutionName,
      kakaotalkId,
      phoneNumber,
      instagram,
      twitter,
      facebook,
      detail,
      photos,
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
    const dogId = req.params.dogId;

    const {
      endingCountry,
      endingAirport,
      name,
      gender,
      age,
      weight,
      neutralization,
      health,
      isInstitution,
      institutionName,
      kakaotalkId,
      phoneNumber,
      instagram,
      twitter,
      facebook,
      detail,
      photos,
      user,
    } = req.body;

    if (
      !endingCountry ||
      !endingAirport ||
      !name ||
      !gender ||
      !weight ||
      !neutralization ||
      !health ||
      !isInstitution ||
      !institutionName ||
      !user
    ) {
      res.status(SC.BAD_REQUEST).send({ error: RM.NULL_VALUE });
      return;
    }

    DogService.update({
      endingCountry,
      endingAirport,
      name,
      gender,
      age,
      weight,
      neutralization,
      health,
      isInstitution,
      institutionName,
      kakaotalkId,
      phoneNumber,
      instagram,
      twitter,
      facebook,
      detail,
      photos,
      user,
      dogId,
    })
      .then((result) => {
        res.status(result.statusCode).send(result.json);
      })
      .catch((err) => {
        next(err);
      });
  }

  async updateStatus(req: Request, res: Response, next) {
    const { user, status } = req.body;
    const dogId = req.params.dogId;

    if (!(status == "waiting" || status == "done")) {
      res.status(SC.BAD_REQUEST).send({ error: RM.STATUS_NOT_VALID });
      return;
    }

    DogService.updateStatus(user, dogId, status)
      .then((result) => {
        res.status(result.statusCode).send(result.json);
      })
      .catch((err) => {
        next(err);
      });
  }

  async updateAttribute(req: Request, res: Response, next) {
    const dogId = req.params.dogId;
    const body = req.body;

    DogService.updateAttribute(dogId, body)
      .then((result) => {
        res.status(result.statusCode).send(result.json);
      })
      .catch((err) => {
        next(err);
      });
  }

  async delete(req: Request, res: Response, next) {
    const user = req.body.user;
    const dogId = req.params.dogId;

    DogService.delete(user, dogId)
      .then((result) => {
        res.status(result.statusCode).send(result.json);
      })
      .catch((err) => {
        next(err);
      });
  }

  async findMy(req: Request, res: Response, next) {
    const { order = "latest", page = 1, postNumInPage = 16 } = req.query;
    const userId = req.body.user.id;

    DogService.findMy(order, page, postNumInPage, userId)
      .then((result) => {
        res.status(result.statusCode).send(result.json);
      })
      .catch((err) => {
        next(err);
      });
  }

  async search(req: Request, res: Response, next) {
    const { order = "latest", page = 1, postNumInPage = 16 } = req.query;
    const airport = req.params.endingAirport;

    DogService.search(order, page, postNumInPage, airport)
      .then((result) => {
        res.status(result.statusCode).send(result.json);
      })
      .catch((err) => {
        next(err);
      });
  }

  async searchDeleted(req: Request, res: Response, next) {
    DogService.searchDeleted()
      .then((result) => {
        res.status(result.statusCode).send(result.json);
      })
      .catch((err) => {
        next(err);
      });
  }
}

export default new DogController();
