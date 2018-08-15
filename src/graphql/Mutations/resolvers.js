import UserModel from '../../Models/User/UserModel';
import hash from '../../utils/hash';
import Token from '../../Services/Auth/Token';
import verificationCode from '../../utils/verificationCodeGenerator';
import Mail from '../../Services/Mail/Mail';

import lib from './lib';

const {
  sendMailGetVerificationCode,
  isPasswordUpdated,
  signUser
} = lib;




const resolvers = {
  Mutation:{
    async signUp(_, args, ctx){
      const {input:{email}} = args;
      debugger;
      if(ctx.req.user){
        ctx.res.json({error:'Already Signed In'})
      }

      else{
        const userRecord = await ctx.UserModel.getUserByEmail(email);

        if(userRecord.length === 0) {
          debugger
          const verificationCode = await sendMailGetVerificationCode(email);
          return await signUser(ctx.UserModel, args.input, ctx.res, verificationCode);
        }

        else {
          ctx.res.json({error: 'email already exsists'})
        }
      }
    },

    async login(_,args,ctx){

      const {input: {password, email}} = args;
      const fetched = await ctx.UserModel.getUserByEmail(email);
      const user = fetched[0];
      if(!user){
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
    },


    async verifyEmail(_,args,ctx){
      const {email, verificationCode} = args.input;
      const user = await ctx.UserModel.getUserByEmail(email);
      if(user.length === 0){
        ctx.res.json({error: 'invalid credentials'});
      }
      else{
        const userCode = user[0].email_verification_code;
        if(userCode === verificationCode){
          return  await ctx.UserModel.verifyEmail(email);

        }
        else{
          ctx.res.json({error: 'Invalid Code'})
        }
      }
    },

   updateUser(_,args,ctx){
      return ctx.isAuthenticated(ctx.req,ctx.res, async() => {
        const user = ctx.req.user;
        debugger;
        const {email,password, name, surname, gender} = args.input;
        if(email){
          const userRecord = await ctx.UserModel.getUserByEmail(email);
          if(userRecord.length === 0){
            const verificationCode = await sendMailGetVerificationCode(email);
            const hashedPassword = await isPasswordUpdated(password);
            return await ctx.UserModel.updateUser(user.email,{
              email,
              name,
              surname,
              gender,
              password: hashedPassword,
              email_verification_code: verificationCode,
              email_verified: false
            })
          }
          else{
            ctx.res.json({error: 'Email already exisists'})
          }

        }
        else {
          const hashedPassword = await isPasswordUpdated(password);
          return ctx.UserModel.updateUser(user.email,{
            email,
            name,
            surname,
            gender,
            password: hashedPassword
          })
        }
      });
    }
  }
}

export default resolvers;


