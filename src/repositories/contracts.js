
const { Op } = require("sequelize");
const getContractRepo= async ({id, profileId, model}) =>{

const response =  await model.findOne({where: {id,
    [Op.or]: [
    { ContractorId: profileId },
    { ClientId: profileId }
]
}})
return response
}

const listContractsRepo=async (Contract, profileId)=>{
    const response = await Contract.findAll({where: {
        [Op.or]: [
            { ContractorId: profileId },
            { ClientId: profileId }]
    }})
    return response
}

module.exports   =  {
    getContractRepo,
     listContractsRepo
};