import { Router, Request, Response } from "express";
import multer from "multer";

import Dog from "../models/Dog";
import { IDogInputDTO } from "../interfaces/IDog";

import { imageFilter, cleanFolder } from "../utils/filter";
import { calculateSKipAndLimit } from "../utils/paging";

import aws from "../middleware/aws";
import auth from "../middleware/auth";

const router = Router();

// things for file upload.
const UPLOAD_PATH = "uploads";
const upload = multer({ dest: `${UPLOAD_PATH}/`, fileFilter: imageFilter });

/**
 *  @route GET api/dogs
 *  @desc Get all dogs order by date
 *  @access Public
 */
router.get("/", async (req: Request, res: Response) => {
  try {
    const orderHash = { latest: -1, oldest: 1, undefined: 1 };

    const order: any = req.query.order;
    const { page = 1, postNumInPage = 16 } = req.query;

    const { skip, limit } = calculateSKipAndLimit(
      page as any as number,
      postNumInPage as any as number
    );

    const dogs = await Dog.find({ status: "waiting" })
      .sort({ registerDate: orderHash[order] })
      .skip(skip)
      .limit(limit);
    const totalNum = await Dog.countDocuments({});

    const response = { data: dogs, totalNum: totalNum };

    res.status(200).json(response);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

/**
 *  @route GET api/dogs/detail/:dogId
 *  @desc Get one dog with matching id. order by date
 *  @access Public
 */
router.get("/detail/:dogId", async (req: Request, res: Response) => {
  try {
    const dogId = req.params.dogId;
    const dog = await Dog.findOne({ _id: dogId });

    if (!dog)
      return res.status(400).json({ status: 400, msg: "Dog not found" });

    const response = { data: dog };
    res.status(200).json(response);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

/**
 *  @route GET api/dogs/search/:endingAirport
 *  @desc Get all dogs filterd by airport
 *  @access Public
 */
router.get("/search/:endingAirport", async (req: Request, res: Response) => {
  try {
    const orderHash = { latest: -1, oldest: 1, undefined: 1 };

    const order: any = req.query.order;
    const { page = 1, postNumInPage = 16 } = req.query;

    const { skip, limit } = calculateSKipAndLimit(
      page as any as number,
      postNumInPage as any as number
    );

    const dogs = await Dog.find({
      endingAirport: req.params.endingAirport,
      status: "waiting",
    })
      .sort({ registerDate: orderHash[order] })
      .skip(skip)
      .limit(limit);
    const totalNum = await Dog.countDocuments({});

    const response = { data: dogs, totalNum: totalNum };

    res.status(200).json(response);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

/**
 *  @route POST api/dogs
 *  @desc Create one dog
 *  @access Private
 */
router.post(
  "/",
  upload.array("photos", 5),
  auth,
  aws.imageUploadToS3,
  async (req, res) => {
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

    let dogFields: IDogInputDTO = {
      user: user.id,
    };

    if (endingCountry) dogFields.endingCountry = endingCountry;
    if (endingAirport) dogFields.endingAirport = endingAirport;
    if (name) dogFields.name = name;
    if (gender) dogFields.gender = gender;
    if (age) dogFields.age = age;
    if (weight) dogFields.weight = weight;
    if (neutralization) dogFields.neutralization = neutralization;
    if (health) dogFields.health = health;
    if (isInstitution) dogFields.isInstitution = isInstitution;
    if (institutionName) dogFields.institutionName = institutionName;
    if (kakaotalkId) dogFields.kakaotalkId = kakaotalkId;
    if (phoneNumber) dogFields.phoneNumber = phoneNumber;
    if (instagram) dogFields.instagram = instagram;
    if (twitter) dogFields.twitter = twitter;
    if (facebook) dogFields.facebook = facebook;
    if (detail) dogFields.detail = detail;
    if (photos) dogFields.photos = photos;

    try {
      // Create
      let dog = new Dog(dogFields);
      await dog.save();

      cleanFolder(`${UPLOAD_PATH}/`);

      res.status(200).json(dog);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error.");
    }
  }
);

module.exports = router;
