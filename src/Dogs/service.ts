import Dog from "../models/Dog";
import { IDogInputDTO } from "../interfaces/IDog";
import { SC } from "../utils/statusCode";
import { RM } from "../utils/responseMessage";
import { calculateSKipAndLimit } from "../utils/paging";

const orderHash = { latest: -1, oldest: 1, undefined: 1 };

class DogService {
  async readAll(order, page, postNumInPage) {
    const { skip, limit } = calculateSKipAndLimit(
      page as number,
      postNumInPage as number
    );

    const dogs = await Dog.find({ status: "waiting" })
      .sort({ registerDate: orderHash[order] })
      .skip(skip)
      .limit(limit);
    const totalNum = await Dog.countDocuments({});

    return { statusCode: SC.SUCCESS, json: { data: dogs, totalNum: totalNum } };
  }

  async readOne(dogId) {
    const dog = await Dog.findOne({ _id: dogId, status: { $ne: "deleted" } });

    if (!dog) {
      return { statusCode: SC.NOT_FOUND, json: { error: RM.DOG_NOT_FOUND } };
    }

    return { statusCode: SC.SUCCESS, json: { data: dog } };
  }

  async create({
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
  }) {
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

    // Create
    let dog = new Dog(dogFields);
    await dog.save();

    return { statusCode: SC.SUCCESS, json: { data: dog } };
  }

  async update({
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
  }) {
    let dog = await Dog.findOne({ _id: dogId, status: { $ne: "deleted" } });

    if (!dog) {
      return { statusCode: SC.NOT_FOUND, json: { error: RM.DOG_NOT_FOUND } };
    }
    const owner = dog.user;

    if (user.id != owner) {
      return { statusCode: SC.FORBIDDEN, json: { error: RM.NO_AUTHENTICATED } };
    }

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

    await dog.save();
    return { statusCode: SC.SUCCESS, json: { data: dog } };
  }

  async updateStatus(user, dogId, status) {
    let dog = await Dog.findOne({ _id: dogId, status: { $ne: "deleted" } });

    if (!dog) {
      return { statusCode: SC.NOT_FOUND, json: { error: RM.DOG_NOT_FOUND } };
    }

    const owner = dog.user;

    if (user.id != owner) {
      return { statusCode: SC.FORBIDDEN, json: { error: RM.NO_AUTHENTICATED } };
    }

    dog.status = status;
    await dog.save();
    return { statusCode: SC.SUCCESS, json: { data: dog } };
  }

  async delete(user, dogId) {
    let dog = await Dog.findOne({ _id: dogId });
    
    if (!dog) {
      return { statusCode: SC.NOT_FOUND, json: { error: RM.DOG_NOT_FOUND } };
    }
    
    const owner = dog.user;

    if (user.id != owner) {
      return { statusCode: SC.FORBIDDEN, json: { error: RM.NO_AUTHENTICATED } };
    }
    dog.status = "deleted";
    await dog.save();
    return { statusCode: SC.SUCCESS, json: { data: "deleted" } };
  }

  async findMy(order, page, postNumInPage, userId) {
    const { skip, limit } = calculateSKipAndLimit(
      page as number,
      postNumInPage as number
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

    return { statusCode: SC.SUCCESS, json: { data: dogs, totalNum: totalNum } };
  }

  async search(order, page, postNumInPage, airport) {
    const { skip, limit } = calculateSKipAndLimit(
      page as number,
      postNumInPage as number
    );

    const dogs = await Dog.find({
      endingAirport: airport,
      status: "waiting",
    })
      .sort({ registerDate: orderHash[order] })
      .skip(skip)
      .limit(limit);
    const totalNum = await Dog.countDocuments({
      endingAirport: airport,
      status: "waiting",
    });

    return { statusCode: SC.SUCCESS, json: { data: dogs, totalNum: totalNum } };
  }

  async searchDeleted() {

    const dogs = await Dog.find({
      status: "deleted"
    })

    const totalNum = await Dog.countDocuments({
      status: "deleted",
    });

    return { statusCode: SC.SUCCESS, json: { data: dogs, totalNum: totalNum } };
  }
}

export default new DogService();
