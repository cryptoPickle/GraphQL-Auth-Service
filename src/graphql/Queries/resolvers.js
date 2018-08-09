import isLoggedIn from '../utils/isLoggedIn'


const resolvers = {
  Query: {

    async getTokens(_, args, ctx){
      return isLoggedIn(ctx.req, async() => {
        const {id} = ctx.req.user;
        const tokens = await ctx.TokenModel.getTokens(id);
        return tokens[0]
      });
    },
    getProfile(_,args,ctx){
      return isLoggedIn(ctx.req, () => ctx.req.user)
    }
  }
}

export default resolvers;