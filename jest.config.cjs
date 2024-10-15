module.exports = {
  testEnvironment: "node", // Specify the test environment (node or jsdom)
  transform: {
    "^.+\\.js$": "babel-jest", // Use babel-jest for transforming JS files
  },
  // Other Jest configurations can go here
};
