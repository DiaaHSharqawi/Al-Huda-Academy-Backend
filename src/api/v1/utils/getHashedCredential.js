const bcrypt = require("bcrypt");
const dotenv = require("dotenv");

dotenv.config();

const HASH_PASSWORD_SALT = parseInt(process.env.BCRYPT_SALT);

const getHashedCredential = async (credential) => {
  console.log(`getHashedCredential`);

  const hashedCredential = await bcrypt.hash(credential, HASH_PASSWORD_SALT);
  return hashedCredential;
};

module.exports = getHashedCredential;
