const axios = require("axios");
const FormData = require("form-data");

const getSecureImagesURL = async (images) => {
  try {
    console.log(`getSecureImagesURL Utils`);
    console.log(images);

    if (images) {
      const formData = new FormData();

      images.forEach((image) => {
        formData.append("images", image.buffer, image.originalname);
      });

      const uploadResponse = await axios.post(
        `${process.env.BASE_URL}/uploadFile`,
        formData,
        {
          headers: {
            ...formData.getHeaders(),
          },
        }
      );

      console.dir(uploadResponse.data, { depth: null });

      return uploadResponse.data;
    }
  } catch (error) {
    console.error("Error uploading images:", error.message);
    throw error;
  }
};

module.exports = getSecureImagesURL;
