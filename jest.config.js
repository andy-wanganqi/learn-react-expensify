require('dotenv').config();

/** @returns {Promise<import('jest').Config>} */
module.exports = async () => {
  return {
    verbose: true,
  };
};
