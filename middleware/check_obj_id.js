// This middleware will check if the ID in the URL match with MongoDB ID format
module.exports = (req, res, next) => {
  if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    // ID in the URL match with MongoDB ID format
    next();
  } else {
    // ID in the URL do not match with MongoDB ID format
    res.status(404).json("Incorrect ID format");
  }
};
