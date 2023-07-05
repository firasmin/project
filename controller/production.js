const path = require('path');
const rootDir = require('../util/path');
exports.getaddproduct=(req, res, next) => {
  res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
}
  exports.postaddproduct=(req, res, next) => {
    console.log(req.body);
    res.redirect('/');
  }

  exports.getproduct=(req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'shop.html'));
  }
  exports.contact=(req, res, next) => {
    res.sendFile(path.join(__dirname,'../', 'views', 'contact.html'));
    
}
exports.success=(req, res, next) => {
  res.sendFile(path.join(__dirname, '../','views', 'success.html'));
  console.log(req.body)
}
