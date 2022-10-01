const { Op } = require("sequelize");
const {contractStatus} = require('../utils/constants')

async function getAllUnpaidJobs(req, res){
    const{Job,Contract} = req.app.get('models')

    const profileId = req.profile.id
    console.log(req.profile)
    const contracts = await Contract.findAll({where:{
        status:contractStatus.active,
        [Op.or]: [
            { ContractorId: profileId },
            { ClientId: profileId }]
    }});

    const activeContractId = contracts?.map( contract => contract.id)

    const unpaidJobs = await Job.findAll({
        where: {
            contractId:{
                [Op.in]: activeContractId
            },
            paid: null
        }
    })
        res.json(unpaidJobs)
}

async function payJobs(req, res) {
    try {
    const{Job,Contract,Profile} = req.app.get('models')
    const jobId = req.params
    const {id, balance, type} = req.profile
    const sequelize = req.app.get('sequelize');

    if(type !== 'client') return res.status(401).send({message: 'not authorized'})

    const jobToPay = await Job.findOne({
        where: { id: jobId.job_id, paid: { [Op.is]: null }, price:{
            [Op.lte]: balance
        }},
        include: [
          {
            model: Contract,
            where: { status: contractStatus.active, ClientId: id },
          },
        ],
      });
    if(!jobToPay) return res.status(401).send({message: 'You have insufficient balance to pay'});

    const amountToBePaid = jobToPay.price
    const contractorId = jobToPay.Contract.ContractorId
    const result = await sequelize.transaction(async (t) => {

        await Profile.update(
            { balance: sequelize.literal(`balance - ${amountToBePaid}`) },
            { where: { id } },
            { transaction: t },
          ),

          await Profile.update(
            { balance: sequelize.literal(`balance + ${amountToBePaid}`) },
            { where: { id: contractorId } },
            { transaction: t },
          ),

         await Job.update(
            { paid: 1, paymentDate: new Date() },
            { where: { id: jobId.job_id } },
            { transaction: t },
          )
      });

        return res.json({ message: `payment successful amount:${amountToBePaid}`})
      
      } catch (error) {
        console.error(error);
      return res.status(error.status || 500).json(error);
      
      }
}


module.exports ={
    getAllUnpaidJobs,
    payJobs
}