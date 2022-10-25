"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _productsController = _interopRequireDefault(require("../controller/productsController"));
var _celebrate = require("celebrate");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const productController = new _productsController.default();
const productRoutes = (0, _express.Router)();
productRoutes.get('/', productController.listAll);
productRoutes.get('/:id', (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    id: _celebrate.Joi.string().uuid().required()
  }
}), productController.listOne);
productRoutes.post('/', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    name: _celebrate.Joi.string().min(3).max(50).required(),
    price: _celebrate.Joi.number().precision(2).required(),
    quantity: _celebrate.Joi.number().required()
  }
}), productController.create);
productRoutes.put('/:id', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    name: _celebrate.Joi.string().min(3).max(50).required(),
    price: _celebrate.Joi.number().precision(2).required(),
    quantity: _celebrate.Joi.number().required()
  },
  [_celebrate.Segments.PARAMS]: {
    id: _celebrate.Joi.string().uuid().required()
  }
}), productController.update);
productRoutes.delete('/:id', (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    id: _celebrate.Joi.string().uuid().required()
  }
}), productController.delete);
var _default = productRoutes;
exports.default = _default;