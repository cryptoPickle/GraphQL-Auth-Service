import hash from '../../utils/hash';
import Token from '../../Services/Auth/Token';
import verificationCode from '../../utils/verificationCodeGenerator';
import Mail from '../../Services/Mail/Mail';
import defaultConfig from '../../config';

const {SENDER_ADDRESS, SENDER_NAME, DEFAULT_MAIL_CONTENT, DEFAULT_MAIL_SUBJECT} = defaultConfig;

const resolvers = {
  Mutation:{
    async signUp(_,args,ctx){
      if(ctx.req.user){
        throw new Error('Already Signed In')
      }


      else{
        const {input:{password, email, name, surname, age, birthday, gender}} = args;
        const userRecord = await ctx.UserModel.getUserByEmail(email);

        if(userRecord.length === 0) {
          const mailler = new Mail();
          const email_verification_code = verificationCode();

          const hashedPassword = await hash.password(password);
          const user = {
            email, name, surname, age, birthday, gender,
            password: hashedPassword, isCompleted: true,
            email_verification_code
          };
          const mail = {
            from: `${SENDER_NAME} <${SENDER_ADDRESS}>`,
            to: email,
            subject: DEFAULT_MAIL_SUBJECT,
            text: `${DEFAULT_MAIL_CONTENT} \n ${email_verification_code}`
          };

          await mailler.sendMail(mail)

          return await ctx.UserModel.addUser(user,ctx.res);
        }


        else {
          ctx.res.json({error: 'email already already exsists'})
        }
      }
    },

    async login(_,args,ctx){

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