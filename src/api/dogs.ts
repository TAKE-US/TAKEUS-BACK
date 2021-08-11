import { Router, Request, Response } from "express";
import multer from "multer";

import Dog from "../models/Dog";
import { IDogInputDTO } from "../interfaces/IDog";

import { imageFilter } from "../utils/filter";
import { calculateSKipAndLimit } from "../utils/paging";

import auth from "../middleware/auth";
import imageUpload from "../middleware/imageUpload";

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

    res.status(200).json({ data: dogs, totalNum: totalNum });
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
    const dog = await Dog.findOne({ _id: dogId, status: { $ne: "deleted" } });

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

    const totalNum = await Dog.countDocuments({
      endingAirport: req.params.endingAirport,
      status: "waiting",
    });

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
  imageUpload,
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

      res.status(200).json(dog);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error.");
    }
  }
);

/**
 *  @route GET api/dogs/my
 *  @desc Get my dogs
 *  @access Private
 */
router.get("/my", auth, async (req: Request, res: Response) => {
  try {
    const orderHash = { latest: -1, oldest: 1, undefined: 1 };
    const order: any = req.query.order;
    const userId = req.body.user.id;

    const { page = 1, postNumInPage = 16 } = req.query;

    const { skip, limit } = calculateSKipAndLimit(
      page as any as number,
      postNumInPage as any as number
    );

    const dogs = await Dog.find({
      user: userId,
      status: { $ne: "deleted" },
    })
      .sort({ status: -1, registerDate: orderHash[order] })
      .skip(skip)
      .limit(limit);

    const totalNum = await Dog.countDocuments({
      user: userId,
      status: { $ne: "deleted" },
    });

    res.status(200).json({ data: dogs, totalNum: totalNum });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

/**
 *  @route PUT api/dogs/detail/:dogId
 *  @desc Update dog
 *  @access Private
 */
router.put(
  "/detail/:dogId",
  upload.array("photos", 5),
  auth,
  imageUpload,
  async (req, res) => {
    const userId = req.body.user.id;
    const dogId = req.params.dogId;

    let dog = await Dog.findOne({ _id: dogId, status: { $ne: "deleted" } });

    if (!dog)
      return res.status(400).json({ status: 400, msg: "Dog not found" });

    const owner = dog.user;

    if (userId != owner) {
      res.status(403).json({ msg: "Invalid access. no authenticated." });
    }

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

    if (endingCountry) dog.endingCountry = endingCountry;
    if (endingAirport) dog.endingAirport = endingAirport;
    if (name) dog.name = name;
    if (gender) dog.gender = gender;
    if (age) dog.age = age;
    if (weight) dog.weight = weight;
    if (neutralization) dog.neutralization = neutralization;
    if (health) dog.health = health;
    if (isInstitution) dog.isInstitution = isInstitution;
    if (institutionName) dog.institutionName = institutionName;
    if (kakaotalkId) dog.kakaotalkId = kakaotalkId;
    if (phoneNumber) dog.phoneNumber = phoneNumber;
    if (instagram) dog.instagram = instagram;
    if (twitter) dog.twitter = twitter;
    if (facebook) dog.facebook = facebook;
    if (detail) dog.detail = detail;
    if (photos) dog.photos = photos;

    try {
      // Update
      await dog.save();

      res.status(200).json(dog);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error.");
    }
  }
);

/**
 *  @route PUT api/dogs/detail/:dogId/status
 *  @desc Update dog's status
 *  @access Private
 */
router.put(
  "/detail/:dogId/status",
  auth,
  async (req: Request, res: Response) => {
    try {
      const userId = req.body.user.id;
      const status = req.body.status;
      const dogId = req.params.dogId;

      if (!(status == "waiting" || status == "done")) {
        res.status(400).json({ msg: "유효하지 않은 값입니다." });
      }

      let dog = await Dog.findOne({ _id: dogId, status: { $ne: "deleted" } });
      if (!dog)
        return res.status(400).json({ status: 400, msg: "Dog not found" });

      const owner = dog.user;

      if (userId != owner) {
        res.status(403).json({ msg: "Invalid access. no authenticated." });
      }

      dog.status = status;
      dog.save();

      res.status(200).json({ data: dog });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

/**
 *  @route DELETE api/dogs/detail/:dogId/
 *  @desc Delete dog
 *  @access Private
 */
router.delete("/detail/:dogId", auth, async (req: Request, res: Response) => {
  try {
    const userId = req.body.user.id;
    const dogId = req.params.dogId;

    let dog = await Dog.findOne({ _id: dogId });
    const owner = dog.user;

    if (userId != owner) {
      res.status(403).json({ msg: "Invalid access. no authenticated." });
    }

    dog.status = "deleted";
    dog.save();

    res.status(200).json({ data: "deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

/**
 *  @route GET api/dogs/deleted
 *  @desc Get deleted dogs
 *  @access Public
 */
router.get("/deleted", async (req: Request, res: Response) => {
  try {
    const dogs = await Dog.find({ status: "deleted" });

    res.status(200).json({ data: dogs });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
