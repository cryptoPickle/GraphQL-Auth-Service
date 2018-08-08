export const generateResponse = (req, res) => {
  const user = req.user;
  res.json({user})
};
