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

  describe('get List of Contracts', () => { 
    const stubValues = [];
    Array.from({ length: 5 }).forEach(() =>
      stubValues.push(createRandomContracts())
    );
    it("should return a list of contracts", async () => {
        const stub = sinon.stub(Contract, "findAll").returns(stubValues);
        
        const contractRepo = new contractRepository();
        const contracts = await contractRepo.listContracts(2);
        console.log(contracts);
        expect(stub.calledOnce).to.be.true;
        expect(contracts.length).to.be.equal(stubValues.length);

    })
   })
});

function createRandomContracts() {
    return {
      id: faker.datatype.number({ max: 5 }),
      terms: faker.lorem.paragraph(),
      status: "in_progress",
      createdAt: faker.date.past(),
      updatedAt: faker.date.past(),
      ContractorId: faker.datatype.number({ max: 5 }),
      ClientId: faker.datatype.number({ min:1, max: 2 }),
    };
  }
