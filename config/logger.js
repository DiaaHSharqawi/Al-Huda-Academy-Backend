import winston from "winston";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message, ...meta }) => {
      return (
        JSON.stringify(
          {
            timestamp,
            level,
            message,
            ...(meta && Object.keys(meta).length ? { data: meta } : {}), // Add additional data if present
          },
          null,
          2
        ) + "\n"
      );
    })
  ),
  transports: [
    new winston.transports.Console({
      level: "info",
    }),
    new winston.transports.File({
      filename: "error.log",
      level: "error",
    }),
  ],
});

// Handle exceptions and rejections
logger.exceptions.handle(
  new winston.transports.File({ filename: "exceptions.log" })
);

logger.rejections.handle(
  new winston.transports.File({ filename: "rejections.log" })
);

export default logger;
