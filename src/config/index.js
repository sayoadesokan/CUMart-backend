const dotEnv = require('dotenv');

if (process.env.NODE_ENV !== 'prod') {
  const configFile = `./.env`;
  dotEnv.config({ path: configFile });
} else {
  dotEnv.config;
}

module.exports = {
  PORT: process.env.PORT,
  MONGO_URL: process.env.MONGO_URL,
  ADMIN_USERNAME: process.env.ADMIN_USERNAME,
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
  APP_SECRET: process.env.APP_SECRETS,
};
