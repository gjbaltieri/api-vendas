"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateProducts1663706227597 = void 0;
var _typeorm = require("typeorm");
class CreateProducts1663706227597 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'products',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()'
      }, {
        name: 'name',
        type: 'varchar'
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
    await queryRunner.dropTable('products');
  }
}
exports.CreateProducts1663706227597 = CreateProducts1663706227597;