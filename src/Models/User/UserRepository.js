import UserModel from './UserModel';


export default {
  async addUser(userInfo){
    return await UserModel.query().insert(userInfo)
  },
  async getUserByEmail(email){
    return await UserModel.query().where('email', '=', email)
  },
  async getUserById(id){
    return await UserModel.query().where('id', '=', id)
  },
  async findOrCreate(model, userinfo, type){

    const returnedFields = ['id','email', 'name', 'surname','birthday', 'gender']

    try{
      const fetched = await UserModel.query().where(model).select(returnedFields);
      if(fetched.length === 0){
        await UserModel.query().insert(userinfo);
        return await UserModel.query().where(model).select(returnedFields);

      }

      return fetched;
    }catch (e) {
      console.log(e);
    }
  }
}