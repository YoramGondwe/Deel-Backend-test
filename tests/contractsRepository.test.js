const chai = require("chai");
const sinon = require("sinon");
const { faker } = require("@faker-js/faker");
const contractRepository = require("../src/repositories/contracts");
const { Contract } = require("../src/model");

const expect = chai.expect;

describe("Contracts Repository", function () {
  const stubValue = {
    id: faker.datatype.number({ max: 5 }),
    terms: faker.lorem.paragraph(),
    status: "in_progress",
    createdAt: faker.date.past(),
    updatedAt: faker.date.past(),
    ContractorId: faker.datatype.number({ max: 5 }),
    ClientId: faker.datatype.number({ max: 5 }),
  };
  describe("getContract", () => {
    it("should return a contract", async () => {
      const stub = sinon.stub(Contract, "findOne").returns(stubValue);
      const contractRepo = new contractRepository();
      const contract = await contractRepo.getContract(stub.id);
      expect(stub.calledOnce).to.be.true;
      expect(contract.id).to.be.equal(stubValue.id);
    });
  });
});
