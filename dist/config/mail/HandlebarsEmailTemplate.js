"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _handlebars = _interopRequireDefault(require("handlebars"));
var _fs = _interopRequireDefault(require("fs"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class HandlebarEmailTemplate {
  async parse({
    file,
    variables
  }) {
    const fileContent = await _fs.default.promises.readFile(file, {
      encoding: 'utf-8'
    });
    const parseTemplate = _handlebars.default.compile(fileContent);
    return parseTemplate(variables);
  }
}
exports.default = HandlebarEmailTemplate;