import hash from '../../utils/hash'

const resolvers = {
  Mutation:{
    async signUp(_,args,ctx){
      if(ctx.req.user){
        throw new Error('Already Signed In')
      }
      else{
        const {input:{password, email, name, surname, age, birthday, gender}} = args;
        const hashedPassword = await hash(password);
        const user = {
          email, name, surname, age, birthday, gender,
          password: hashedPassword, isCompleted: true
        };
        return await ctx.UserModel.addUser(user,ctx.res);
      }
    },

    login(_,args,ctx){
      return null;
    }
  }
}

export default resolvers;