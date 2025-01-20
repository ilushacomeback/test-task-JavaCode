module.exports = {
  accessToken: {
    salt: process.env.ACCESS_TOKEN,
    expired: '30m',
    type: 'access',
  },
  refreshToken: {
    salt: process.env.REFRESH_TOKEN,
    expired: '30d',
    type: 'refresh',
  },
};

