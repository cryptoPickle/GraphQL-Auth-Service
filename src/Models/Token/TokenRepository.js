import TokenModel from './TokenModel';

export default {

  async findOrUpdate(userId,tokens){
    const selected = ['jwt_access_token','jwt_refresh_token']
    try{

      const fetched = await TokenModel.query().where({user_id: userId});

      // Update Token If UserId Exists and Fetch::::::::::::::::::::::::::::::::
      if(fetched.length !== 0) {

        await TokenModel.query().patch(tokens);

        const tkns = await TokenModel.query()
          .where({user_id: userId})
          .select(selected)

        return tkns[0]

      }
      // Create Token If User Id Does Not Exists and fetch::::::::::::::::::::::

      return await TokenModel.query()
        .insertAndFetch({user_id: userId, ...tokens})
        .select(selected);
    }catch (e) {
      console.log(e)
    }
  },
  async getTokens(user_id){
    try{
      return await TokenModel.query().where({user_id})
    }catch (e) {
      console.log(e)
    }
  },
}
