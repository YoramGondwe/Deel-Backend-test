const chai = require("chai");
const sinon = require("sinon");
const { faker } = require("@faker-js/faker");
const contractRepository = require("../src/repositories/contracts");
const { Contract } = require("../src/model");

const expect = chai.expect;

const contractControl = require("../src/controllers/contracts");
const repo = require("../src/repositories/contracts");

describe("getAllContracts", function () {
    let json, res, req , contractController;
    const stubValues = [];
    Array.from({ length: 5 }).forEach(() =>
      stubValues.push(createRandomContracts())
    );
    beforeEach(function () { 
        send= stubValues;
        res={json: function(){}}
        contractController = new contractControl()
        req = {
            profile: {
              id: faker.datatype.number({ max: 5 }),
              firstName: faker.name.firstName(),
              lastName: faker.name.lastName(),
              profession: faker.word.adjective(),
              balance: faker.datatype.float(),
              type: "client",
              createdAt: faker.date.past(),
              updatedAt: faker.date.past(),
            },
          };
    })
  it("should return all contracts", async function () {

    const mock = sinon.mock(res)
    mock.expects("json")
     .once().withArgs( stubValues )
     const stub = sinon.stub(Contract,"findAll").returns(stubValues);
     
   await contractController.getAllContracts(req, res);
    
    expect(stub.calledOnce).to.be.true;
    mock.verify();
  });
});

function createRandomContracts() {
  return {
    id: faker.datatype.number({ max: 5 }),
    terms: faker.lorem.paragraph(),
    status: "in_progress",
    createdAt: faker.date.past(),
    updatedAt: faker.date.past(),
    ContractorId: faker.datatype.number({ max: 5 }),
    ClientId: faker.datatype.number({ max: 5 }),
  };
}
