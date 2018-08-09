const resolvers = {
  Query: {

    async getTokens(_, args, ctx){
      const {id} = ctx.req.user;
      const tokens = await ctx.TokenModel.getTokens(id);
      console.log(tokens)
      return tokens[0]
    },
    getProfile(_,args,ctx){
      return ctx.req.user;
    }
  }
}

export default resolvers;