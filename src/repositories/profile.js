const { Profile } = require("../model");
class profileRepository {
  async addToBalance(balance, transaction) {
    await Profile.update(
      { balance: sequelize.literal(`balance - ${balance}`) },
      { where: { id } },
      transaction && { transaction: transaction }
    );
  }
  async removeFromBalance(balance, transaction) {
    await Profile.update(
      { balance: sequelize.literal(`balance + ${balance}`) },
      { where: { id: contractorId } },
      transaction && { transaction: transaction }
    );
  }
}

module.exports = profileRepository;
