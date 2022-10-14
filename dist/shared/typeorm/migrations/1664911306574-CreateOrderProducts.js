"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateOrderProducts1664911306574 = void 0;
var _typeorm = require("typeorm");
class CreateOrderProducts1664911306574 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'orders_products',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()'
      }, {
        name: 'price',
        type: 'decimal',
        precision: 10,
        scale: 2
      }, {
        name: 'quantity',
        type: 'int'
      }, {
        name: 'created_At',
        type: 'timestamp with time zone',
        default: 'now()'
      }, {
        name: 'updated_At',
        type: 'timestamp with time zone',
        default: 'now()'
      }]
    }));
  }
  async down(queryRunner) {
    await queryRunner.dropTable('orders_products');
  }
}
exports.CreateOrderProducts1664911306574 = CreateOrderProducts1664911306574;