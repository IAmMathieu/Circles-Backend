const randomstring = require("randomstring");
const circleDatamapper = require("../../datamapper/circleDatamapper");
const userDatamapper = require("../../datamapper/userDatamapper");

const uniqueCodeGenerator = {
  async generateCircle() {
    const uniqueCode = randomstring.generate(8);
    const circle = await circleDatamapper.getCircleByCode(uniqueCode);

    if (circle) {
      uniqueCodeGenerator.generate();
    } else {
      return uniqueCode;
    }
  },

  async generateUser() {
    const uniqueCode = randomstring.generate(8);
    const user = await userDatamapper.getUserByCode(uniqueCode);

    if (user) {
      uniqueCodeGenerator.generate();
    } else {
      return uniqueCode;
    }
  },
};

module.exports = uniqueCodeGenerator;
