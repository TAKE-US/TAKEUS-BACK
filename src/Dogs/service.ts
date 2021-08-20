import Dog from "../models/Dog";
import { SC } from "../utils/statusCode";
import { RM } from "../utils/responseMessage";
import { calculateSKipAndLimit } from "../utils/paging";

const orderHash = { latest: -1, oldest: 1, undefined: 1 };

class DogService {
  async readAll(order, page, postNumInPage) {
    const { skip, limit } = calculateSKipAndLimit(
      page as any as number,
      postNumInPage as any as number
    );

    const dogs = await Dog.find({ status: "waiting" })
      .sort({ registerDate: orderHash[order] })
      .skip(skip)
      .limit(limit);
    const totalNum = await Dog.countDocuments({});

    return { statusCode: SC.SUCCESS, json: { data: dogs, totalNum: totalNum } };
  }

  async readOne(dogId) {
    const id = dogId;

    const dog = await Dog.findOne({ _id: dogId, status: { $ne: "deleted" } });

    if (!dog) {
      return { statusCode: SC.NOT_FOUND, json: { msg: RM.DOG_NOT_FOUND } };
    }
  }
}

export default new DogService();
