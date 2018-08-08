import UserModel from './UserModel';


const propertyNameDecider = (type) => {
  switch(type){
    case 'facebook':
      return 'facebook_profile_id';
    case 'google':
      return 'google_profile_id';
  }
}


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


// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// Checks id from outh and email if oauth does not exists but email, updates the
// user with the oauth logins. If doesnt existst creates a new entry in database
// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::


  async findOrCreate(model, userinfo, type){

    const returnedFields = ['id','email', 'name', 'surname'];
    const id = {[propertyNameDecider(type)]:model[propertyNameDecider(type)]}


    try{

      const fetched = await UserModel.query().where(id)
        .orWhere({email:model.email})
        .select(returnedFields);

      if(fetched.length === 0){
        await UserModel.query().insert(userinfo);
        return await UserModel.query().where(model).select(returnedFields);
      }

      if(userinfo.email && fetched[0].email === userinfo.email){

        switch(type){

          case 'facebook':
            const {facebook_profile_id, facebook_verified} = userinfo;
            await UserModel.query().patch({facebook_profile_id, facebook_verified})
            return await UserModel.query().where(model).select(returnedFields);

          case 'google':
            const {google_profile_id, google_verified} = userinfo;
            await UserModel.query().patch({google_profile_id, google_verified})
            return await UserModel.query().where(model).select(returnedFields);
        }
      }

      return fetched;
    }catch (e) {
      console.log(e);
    }
  }
}