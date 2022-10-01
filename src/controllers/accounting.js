const { userType, contractStatus } = require("../utils/constants")

async function deposit(req, res){
    const{Job,Contract,Profile} = req.app.get('models')
    const {user_id} = req.params
    const {amount} = req.body
    const {id, balance, type} = req.profile
    const sequelize = req.app.get('sequelize');
if(type !== userType.client) return res.status(404).end()

const totalJobsToPay = await Job.findAll(
    {
      attributes: {
        include: [[sequelize.fn('SUM', sequelize.col('price')), 'totalPrice']],
      },
      include: [
        {
          attributes: [],
          model: Contract,
          required: true,
          where: {
            ClientId: user_id,
            status: contractStatus.active,
          },
        },
      ],
      where: {
        paid: null,
      },
    }
  );

  const paymentThreshold = totalJobsToPay[0].dataValues.totalPrice + (totalJobsToPay[0].dataValues.totalPrice * 0.25)
    if (amount  > paymentThreshold) return res.status(401).send({message: 'You cannot deposit 25% more than your total jobs to pay'});

    await Profile.update(
        { balance: sequelize.literal(`balance + ${amount}`) },
        { where: { id: user_id } }
      ),
    res.json(totalJobsToPay)

}


module.exports ={
    deposit
}