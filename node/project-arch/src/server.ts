import sum from "./utils/utils";
import config from "./config/config";

console.log("Sum", sum(2, 8));
console.log(process.env.APP_DEBUG);
console.log(config.debug);
