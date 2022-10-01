const chai = require('chai');
const sinon = require('sinon');
const faker = require('@faker-js/faker');

const expect = chai.expect


const {getContract, getAllContracts} = require('../src/controllers/contractor');
const repo = require('../src/repositories/contracts')

describe('getAllContracts', function () {   
    this.beforeAll(() =>{
        res = {
            send: sinon.spy(),
            status: sinon.stub().returns({ end: sinon.spy(), json: sinon.spy() }) //json required here to respond with message in addition to 404
        };
    }) 
    it('should return all contracts', async function () {
        const stubValues = [];
        Array.from({length: 5}).forEach(()=>
        stubValues.push(createRandomContracts())
        );


        const stub = sinon.stub(repo,'listContractsRepo').returns(stubValues)

        const res = await getAllContracts(req,res); 

        expect(res.length).to.be.equal(stubValues.length);
    }  )}
 )

 function createRandomContracts(){
    return
        {
            id: faker.number();
            terms: faker.lorem.paragraph();
            status: "terminated";
            createdAt: faker.date.past();
            updatedAt:faker.date.past();
            ContractorId: 5;
            ClientId: 1
        
    }
 }