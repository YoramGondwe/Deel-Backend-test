const { Op } = require("sequelize");
const jobsRepository = require("../repositories/jobs");
const profileRepository = require("../repositories/profile");
const { contractStatus } = require("../utils/constants");

//TODO: Convert this file into a class and instantiate the repositories in a constructor
const profileRepo = new profileRepository();
const jobsRepo = new jobsRepository();

async function getAllUnpaidJobs(req, res) {
  const profileId = req.profile.id;
  const unpaidJobs = await jobsRepo.getTotalUnpaidJobs(profileId);
  res.json(unpaidJobs);
}

async function payJobs(req, res) {
  try {
    const { Job, Contract, Profile } = req.app.get("models");
    const jobId = req.params;
    const { id, balance, type } = req.profile;
    const sequelize = req.app.get("sequelize");

    if (type !== "client")
      return res.status(401).send({ message: "not authorized" });

    const jobToPay = await Job.findOne({
      where: {
        id: jobId.job_id,
        paid: { [Op.is]: null },
        price: {
          [Op.lte]: balance,
        },
      },
      include: [
        {
          model: Contract,
          where: { status: contractStatus.active, ClientId: id },
        },
      ],
    });
    const amountToBePaid = jobToPay.price;
    const contractorId = jobToPay.Contract.ContractorId;
    if (!jobToPay) return res.status(401).send({ message: "Job Not Found" });
    if (amountToBePaid < balance)
      return res
        .status(401)
        .send({ message: "You have insufficient amount to pay" });

    await sequelize.transaction(async (t) => {
      await Profile.update(
        { balance: sequelize.literal(`balance - ${amountToBePaid}`) },
        { where: { id } },
        { transaction: t }
      ),
        await Profile.update(
          { balance: sequelize.literal(`balance + ${amountToBePaid}`) },
          { where: { id: contractorId } },
          { transaction: t }
        ),
        await Job.update(
          { paid: 1, paymentDate: new Date() },
          { where: { id: jobId.job_id } },
          { transaction: t }
        );
    });

    return res.json({ message: `payment successful amount:${amountToBePaid}` });
  } catch (error) {
    console.error(error);
    return res.status(error.status || 500).json(error);
  }
}

module.exports = {
  getAllUnpaidJobs,
  payJobs,
};
