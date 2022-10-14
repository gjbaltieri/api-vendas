"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateOrders1664907641662 = void 0;
var _typeorm = require("typeorm");
class CreateOrders1664907641662 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'orders',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()'
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
    await queryRunner.dropTable('orders');
  }
}
exports.CreateOrders1664907641662 = CreateOrders1664907641662;