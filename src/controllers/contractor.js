const {getContractRepo, listContractsRepo} = require("../repositories/contracts")

async function getContract(req, res) {
    const {id} = req.params
    const profileId = req.profile.id
    const {Contract} = req.app.get('models')
    const contract = await getContractRepo({id,profileId, model: Contract})
    if(!contract) return res.status(404).send({ message: "You don't have access to this contract"})
    res.json(contract)
}

async function getAllContracts(req, res) {
    const {Contract} = req.app.get('models')
    const profileId = req.profile.id

    const contract = await listContractsRepo(Contract,profileId);
    res.json(contract)
}


module.exports ={
    getContracts: getContract,
    getAllContracts
}