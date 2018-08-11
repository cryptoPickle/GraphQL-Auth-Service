import hash from '../../utils/hash'
import Token from '../../Services/Auth/Token'
const resolvers = {
  Mutation:{
    async signUp(_,args,ctx){
      if(ctx.req.user){
        throw new Error('Already Signed In')
      }
      else{
        const {input:{password, email, name, surname, age, birthday, gender}} = args;
        const hashedPassword = await hash.password(password);
        const user = {
          email, name, surname, age, birthday, gender,
          password: hashedPassword, isCompleted: true
        };
        return await ctx.UserModel.addUser(user,ctx.res);
      }
    },

    async login(_,args,ctx){
      // 1 get password by user email
      // 1a if email exist compare password
      // 1a2 if true / sign token / send token
      // 1a3 if false / send invalid credentials
      // 1b if false sen invalid credentials
      const {input: {password, email}} = args;
      const fetched = await ctx.UserModel.getUserByEmail(email);
      const user = fetched[0];

      if(user.length === 0){
        ctx.res.json({error: 'Invalid Credentials'});
      }
      else{
        const isValidPassword = await hash.compare(password, user.password);
        if(!isValidPassword){
          ctx.res.json({error: 'Invalid Credentials'})
        }
        else{
          const tokenManager = new Token();
          user.isCompleted = true;
          const [jwt_access_token,jwt_refresh_token] = await tokenManager.createTokens(user,user.password);
          return ctx.TokenModel.findOrUpdate(user.id,{jwt_access_token,jwt_refresh_token})
        }
      }
    }
  }
}

export default resolvers;