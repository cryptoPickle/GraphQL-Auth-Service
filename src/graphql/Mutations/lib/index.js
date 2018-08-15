import Mail from '../../../Services/Mail/Mail';
import hash from '../../../utils/hash';
import verificationCode from '../../../utils/verificationCodeGenerator';
import defaultConfig from '../../../config';



const {SENDER_ADDRESS, SENDER_NAME, DEFAULT_MAIL_CONTENT, DEFAULT_MAIL_SUBJECT} = defaultConfig;

const lib = {
  async sendMailGetVerificationCode(email) {
    try{
      const mailler = new Mail();
      const verifyCode = verificationCode();
      const mail = {
        from: `${SENDER_NAME} <${SENDER_ADDRESS}>`,
        to: email,
        subject: DEFAULT_MAIL_SUBJECT,
        text: `${DEFAULT_MAIL_CONTENT} \n ${verifyCode}`
      };
      await mailler.sendMail(mail);
      return verifyCode;
    }catch (e) {
      console.log(e);
    }
  },

  // :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

  async isPasswordUpdated(password){
    return (password) ? await hash(password) : password;
  },

  // :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

  async signUser(model, userObj, res, verificationCode) {
    const {name,email, surname,age,birthday,gender, password} = userObj;

    const hashedPassword = await hash.password(password);

    const user = {
      email, name, surname, age, birthday, gender,
      password: hashedPassword, isCompleted: true,
      email_verification_code: verificationCode
    };

    return await model.addUser(user,res);
  }
};

export default lib;