import { Router, Request, Response } from "express";
import multer from "multer";

import Dog from "../models/Dog";
import { IDogInputDTO } from "../interfaces/IDog";

import { imageFilter, cleanFolder } from "../utils/filter";
import aws from "../middleware/aws";

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

    const dogs = await Dog.find({ status: 'wating' }).sort('registerDate');
    const totalNum = dogs.length;

    const response = { data: dogs, totalNum: totalNum };

    res.json(response);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

/**
 *  @route GET api/dogs/detail/:dogId
 *  @desc Get one dog with matching id.
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
    const query = req.query;
    let searchedDog;
    if (query.order === 'latest') {
      /**
      * 최신순
      * GET /api/dogs/search/:endingAirport?order=latest
      */
      searchedDog = await Dog.find({ endingAirport: req.params.endingAirport, status: 'wating' }).sort({ registerDate: -1 });
    } else {
      /**
      * 오래된순
      * GET /api/dogs/search/:endingAirport?order=oldest
      */
      searchedDog = await Dog.find({ endingAirport: req.params.endingAirport, status: 'wating' }).sort('registerDate');
    }

    res.json(searchedDog);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

/**
 *  @route POST api/dogs
 *  @desc Create one dog
 *  @access Public
 */
router.post("/", upload.array("photos", 5), aws.imageUploadToS3, async (req, res) => {

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
  } = req.body;

  let dogFields: IDogInputDTO = {
    /*
    need to input user.id
    user: user.id,
    */
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
    // let dog = await dog.findOne({ user: user.id });
    let dog = null;
    if (dog) {
      // dog = await dog.findOneAndUpdate(
      //   { user: user.id },
      //   { registerDate: Date.now()},
      //   { $set: { value: dogFields } },
      //   { new: true }
      // );

      // return res.json(profile);
    }

    // Create
    dog = new Dog(dogFields);

    dog.registerDate = Date.now();
    dog.status = "waiting";
    
    await dog.save();
    
    cleanFolder(`${UPLOAD_PATH}/`);
    
    res.json(dog);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error.");
  }
});

module.exports = router;
