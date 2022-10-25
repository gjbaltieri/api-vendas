"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _multer = _interopRequireDefault(require("multer"));
var _crypto = _interopRequireDefault(require("crypto"));
var _path = _interopRequireDefault(require("path"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const uploadFolder = _path.default.resolve(__dirname, '..', '..', 'uploads/');
var _default = {
  directory: uploadFolder,
  storage: _multer.default.diskStorage({
    destination: uploadFolder,
    filename(request, file, callback) {
      const fileHash = _crypto.default.randomBytes(10).toString('hex');
      const fileName = `${fileHash}-${file.originalname}`;
      callback(null, fileName);
    }
  })
};
exports.default = _default;