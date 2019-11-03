export const post = (req, res) => {
  console.log("Body :", JSON.stringify(req.body));

  res.end('POST request received correctly');
};
