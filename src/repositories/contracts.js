"use strict";

const { Op } = require("sequelize");
const { Contract } = require("../model");

module.exports = class contractRepository {
  getContract = async ({ id, profileId }) => {
    const response = await Contract.findOne({
      where: {
        id,
        [Op.or]: [{ ContractorId: profileId }, { ClientId: profileId }],
      },
    });
    return response;
  };

  listContracts = async (profileId) => {
    const response = await Contract.findAll({
      where: {
        [Op.or]: [{ ContractorId: profileId }, { ClientId: profileId }],
      },
    });
    return response;
  };
};
