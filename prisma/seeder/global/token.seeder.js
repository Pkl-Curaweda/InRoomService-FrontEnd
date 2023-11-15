const { prisma } = require('../config');

const userTokens = [
  {
    refreshToken: 'refreshToken1',
    userId: 1,
    expired_at: new Date(),
  },
];

const guestTokens = [
  {
    refreshToken: 'refreshToken2',
    guestId: 1,
    expired_at: new Date(),
  },
];

async function tokenSeed() {
  for (const userToken of userTokens) {
    await prisma.userToken.create({
      data: userToken,
    });
  }

  for (const guestToken of guestTokens) {
    await prisma.guestToken.create({
      data: guestToken,
    });
  }
}

module.exports = { tokenSeed };
