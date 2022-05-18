const randomstring = require("randomstring");
const circleDatamapper = require("../../datamapper/circleDatamapper");

const uniqueCodeGenerator = {
  async generate() {
    const uniqueCode = randomstring.generate(8);
    const circle = await circleDatamapper.getCircleByCode(uniqueCode);

    if (circle) {
      uniqueCodeGenerator.generate();
    } else {
      return uniqueCode;
    }
  },
};

module.exports = uniqueCodeGenerator;
