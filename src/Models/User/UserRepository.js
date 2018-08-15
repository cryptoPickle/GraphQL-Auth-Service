import UserModel from './UserModel';


const propertyNameDecider = (type) => {
  switch(type){
    case 'facebook':
      return 'facebook_profile_id';
    case 'google':
      return 'google_profile_id';
  }
}

const returnedFields = ['id','email', 'name', 'surname','isCompleted','email_verified'];

export default {
  async addUser(userInfo, res){
    try {
      const fetched = await UserModel.query().where({ email: userInfo.email });
      if (fetched.length === 0) {
        return await UserModel.query().insertAndFetch(userInfo)
      }
      else {
        res.json({ error: 'Email is already in use' })
      }
    }catch (e) {
      console.log(e)
    }
  },
  async getUserByEmail(email){
    const fields = [...returnedFields, 'password'];
    return await UserModel.query().where({email}).select(fields);
  },
  async getUserById(id){
    return await UserModel.query().where({id})
  },

  async fetchByIdOrMail(id, email){
    return await await UserModel.query().where((id) ? id : false )
      .orWhere((email) ? {email}: false)
      .select(returnedFields);
  },

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// Checks id from outh and email if oauth does not exists but email, updates the
// user with the oauth logins. If doesnt existst creates a new entry in database
// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::


  async findOrCreate(model, userinfo, type){
    const id = {[propertyNameDecider(type)]:model[propertyNameDecider(type)]}


    try{

      const fetched = await this.fetchByIdOrMail(id, model.email);


      if(fetched.length === 0){
        return  await UserModel.query()
          .insertAndFetch(userinfo)
          .where(id)
          .pick(returnedFields);

      }

      if(userinfo.email && fetched[0].email === userinfo.email){
        const email = userinfo.email;
        switch(type){

          case 'facebook':
            const {facebook_profile_id, facebook_verified} = userinfo;
            await UserModel.query()
              .patch({facebook_profile_id, facebook_verified})
              .where({email})
            return await this.fetchByIdOrMail(id, model.email);

          case 'google':
            const {google_profile_id, google_verified} = userinfo;
            await UserModel.query()
              .patch({google_profile_id, google_verified})
              .where({email})
            return await this.fetchByIdOrMail(id, model.email);
        }
      }

      return fetched;
    }catch (e) {
      console.log(e);
    }
  }
}