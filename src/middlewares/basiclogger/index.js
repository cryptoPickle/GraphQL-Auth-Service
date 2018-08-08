export default (req, res, next) => {
  console.log(new Date().toISOString(), "Method:", req.method, "Endpoint:", req.url );
  next()
}


