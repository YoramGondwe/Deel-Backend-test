const contractRepository = require("../repositories/contracts");

module.exports = class contractController {
  constructor() {
    this.contractRepo = new contractRepository();
  }

  async getContract(req, res) {
    const { id } = req.params;
    const profileId = req.profile.id;
    const contract = await this.contractRepo.getContract({ id, profileId });
    if (!contract)
      return res
        .status(404)
        .send({ message: "You don't have access to this contract" });
    res.json(contract);
  }

  async getAllContracts(req, res) {
    const profileId = req.profile.id;
    const contract = await this.contractRepo.listContracts(profileId);
    res.json(contract);
  }
};
