import logger from "pino";
import dayjs from "dayjs";

const log = logger({
  base: {
    pid: false,
  },
  timestamp: () => `,"time":"${dayjs().format()}"`,
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
      translateTime: "SYS:mm-dd-yyyy hh:mm:ss.l TT",
    },
  },
});

export default log;
