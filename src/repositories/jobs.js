const { Contract,Job } = require("../model");
const { Op } = require("sequelize");
const {contractStatus} = require('../utils/constants')

module.exports = class jobsRepository{

    async getTotalUnpaidJobs({ profileId}) {
        const unpaidJobs = await Job.findAll({
            where: {
                paid: null
            },
            include: [
              {
                model: Contract,
                required: true, 
                attributes: [],
                where: { status: contractStatus.active, [Op.or]: [
                  { ContractorId: profileId },
                  { ClientId: profileId }]},
              },
            ],
        })
        return unpaidJobs
    }
}