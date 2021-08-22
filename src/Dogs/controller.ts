import { Router, Request, Response } from "express";
import DogService from "./service";
import { SC } from "../utils/statusCode";
import { RM } from "../utils/responseMessage";

class DogController {
  async readAll(req: Request, res: Response) {
    // data의 입력과 출력만 있음.
    const { order = "latest", page = 1, postNumInPage = 16 } = req.query;

    DogService.readAll(order, page, postNumInPage)
      .then((result) => {
        res.status(result.statusCode).send(result.json);
      })
      .catch((err) => {
        console.log(err);
        res
          .status(SC.INTERNAL_SERVER_ERROR)
          .send({ error: RM.INTERNAL_SERVER_ERROR });
      });
  }

  async readOne(req: Request, res: Response) {
    const dogId = req.params.dogId;
    DogService.readOne(dogId)
      .then((result) => {
        res.status(result.statusCode).send(result.json);
      })
      .catch((err) => {
        console.log(err);

        if (err.name === "CastError") {
          res.status(SC.BAD_REQUEST).send({ error: RM.WRONG_ID });
        } else {
          res
            .status(SC.INTERNAL_SERVER_ERROR)
            .send({ error: RM.INTERNAL_SERVER_ERROR });
        }
      });
  }

  async create(req: Request, res: Response) {
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
      res.status(SC.BAD_REQUEST).send({error : RM.NULL_VALUE});
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
      user
    }).then((result) => {
      res.status(result.statusCode).send(result.json);
    })
    .catch((err) => {
      console.log(err);
      res
        .status(SC.INTERNAL_SERVER_ERROR)
        .send({ error: RM.INTERNAL_SERVER_ERROR });
    })


  }

  async update(req: Request, res: Response) {}

  async updateStatus(req: Request, res: Response) {
    const {user, status} = req.body;
    const dogId = req.params.dogId;

    if (!(status == "waiting" || status == "done")) {
      res.status(SC.BAD_REQUEST).send({ error: RM.STATUS_NOT_VALID });
      return;
    }

    DogService.updateStatus(user, dogId, status)
      .then((result) => {
        res.status(result.statusCode).send(result.json);
    }).catch((err)=>{
      console.log(err);
      res.
        status(SC.INTERNAL_SERVER_ERROR).
        send({error : RM.INTERNAL_SERVER_ERROR});
    })

  }

  async delete(req: Request, res: Response) {}

  async findMy(req: Request, res: Response) {
    const { order = "latest", page = 1, postNumInPage = 16 } = req.query;
    const userId = req.body.user.id;

    DogService.findMy(order, page, postNumInPage,userId)
      .then((result) => {
        res.status(result.statusCode).send(result.json);
      })
      .catch((err) => {
        console.log(err);
        res
          .status(SC.INTERNAL_SERVER_ERROR)
          .send({ error: RM.INTERNAL_SERVER_ERROR });
      })
  }

  async search(req: Request, res: Response) {
    const { order = "latest", page = 1, postNumInPage = 16 } = req.query;
    const airport = req.params.endingAirport;

    DogService.search(order, page, postNumInPage, airport)
      .then((result) => {
        res.status(result.statusCode).send(result.json);
      })
      .catch((err) => {
        console.log(err);
        res
          .status(SC.INTERNAL_SERVER_ERROR)
          .send({ error: RM.INTERNAL_SERVER_ERROR });
      });
  }
}

export default new DogController();
