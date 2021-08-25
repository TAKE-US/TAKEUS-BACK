import Airport from "../models/Airport";
import { SC } from "../utils/statusCode";
import { RM } from "../utils/responseMessage";

class AirportService {
  async readAll() {
    const airports = await Airport.findOne();
    return { statusCode: SC.SUCCESS, json: { data: airports } };
  }
}

export default new AirportService();
