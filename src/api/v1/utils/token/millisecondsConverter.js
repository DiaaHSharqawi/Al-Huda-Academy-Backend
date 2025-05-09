const MILLISECONDS_IN_SECOND = 1000;
const SECONDS_IN_MINUTE = 60;
const SECONDS_IN_HOUR = 3600;
const SECONDS_IN_DAY = 86400;

const convertTimeToMilliseconds = (timeString) => {
  const numericPart = parseInt(timeString.substring(0, timeString.length - 1));
  const unit = timeString.slice(-1);

  if (isNaN(numericPart) || !["s", "m", "h", "d"].includes(unit)) {
    throw new Error("Invalid time string format");
  }

  switch (unit) {
    case "s":
      return numericPart * MILLISECONDS_IN_SECOND;
    case "m":
      return numericPart * SECONDS_IN_MINUTE * MILLISECONDS_IN_SECOND;
    case "h":
      return numericPart * SECONDS_IN_HOUR * MILLISECONDS_IN_SECOND;
    case "d":
      return numericPart * SECONDS_IN_DAY * MILLISECONDS_IN_SECOND;
  }
};

module.exports = convertTimeToMilliseconds;
