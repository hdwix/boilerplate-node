import { USER_MODEL_PROVIDER } from "src/constants";
import { PingModel } from "./ping.model";

export const modelProvider = [{
    provide: USER_MODEL_PROVIDER,
    useValue: PingModel,
    // inject: [DB_PROVIDER] 
}]