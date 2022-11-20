import axios from "axios";
import { DietListDto } from "./diet.list.dto";
import { DietRequestDto } from "./diet.request.dto";

export class DietApi {
  public static async getDietList(dietRequestDto: DietRequestDto): Promise<DietListDto> {
    return await axios
      .post("http://localhost:3001/food/diet", dietRequestDto).then((resp) => resp.data);
  }
}
