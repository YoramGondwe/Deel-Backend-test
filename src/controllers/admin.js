const { Op } = require("sequelize");
const { Contract } = require("../model");
const { userType } = require("../utils/constants");
const getBestProfessionals = async (req, res) => {
  const { start, end } = req.query;
  const { Job, Contract, Profile } = req.app.get("models");
  const sequelize = req.app.get("sequelize");
  const getBestProfessions = await Profile.findAll({
    attributes: [
      "profession",
      [sequelize.fn("SUM", sequelize.col("price")), "earned"],
    ],
    include: [
      {
        model: Contract,
        as: "Contractor",
        attributes: [],
        required: true,
        include: [
          {
            model: Job,
            required: true,
            attributes: [],
            where: {
              paid: true,
              paymentDate: {
                [Op.gte]: start,
                [Op.lte]: end,
              },
            },
          },
        ],
      },
    ],
    where: {
      type: userType.contractor,
    },
    group: ["profession"],
    order: [[sequelize.col("earned"), "DESC"]],
    limit: 1,
    subQuery: false,
  });

  res.status(200).send({ profession: getBestProfessions[0] });
};

const getBestClients = async (req, res) => {
  const { start, end } = req.query;
  const { Job, Profile } = req.app.get("models");
  const sequelize = req.app.get("sequelize");

  const getMostPayingClient = await Profile.findAll({
    attributes: [
      "firstName",
      "lastName",
      [sequelize.fn("SUM", sequelize.col("price")), "paid"],
    ],
    include: [
      {
        model: Contract,
        as: "Client",
        attributes: [],
        required: true,
        include: [
          {
            model: Job,
            required: true,
            attributes: [],
            where: {
              paid: true,
              paymentDate: {
                [Op.gte]: start,
                [Op.lte]: end,
              },
            },
          },
        ],
      },
    ],
    where: {
      type: userType.client,
    },
    group: ["firstName", "lastName"],
    order: [[sequelize.col("paid"), "DESC"]],
    limit: 1,
    subQuery: false,
  });
  res.status(200).send({ client: getMostPayingClient[0] });
};

module.exports = {
  getBestProfessionals,
  getBestClients,
};
