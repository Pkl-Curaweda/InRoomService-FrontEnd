const { prisma } = require("../config");

const users = [
  {
    name: "Admin",
    gender: "MALE",
    phone: "08123456789",
    picture: "https://i.pravatar.cc/300",
    email: "admindummys@gmail.com",
    nik: "1234567890123456",
    birthday: new Date("1990-01-01"),
    username: "admin",
    password: "$2b$10$CfyAJ93EMuDJBhNdEnn5n.hhOa8/5RnZ.XHjbylgU/97hcxP3l5Yi",
    roleId: 2,
    created_at: new Date(),
    updated_at: new Date(),
  },
];

async function userSeed() {
  for (let user of users) {
    await prisma.user.create({
      data: user,
    });
  }
}

module.exports = { userSeed };
