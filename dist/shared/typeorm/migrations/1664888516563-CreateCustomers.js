"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateCustomers1664888516563 = void 0;
var _typeorm = require("typeorm");
class CreateCustomers1664888516563 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'customers',
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
        name: 'email',
        type: 'varchar',
        isUnique: true
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
    await queryRunner.dropTable('customers');
  }
}
exports.CreateCustomers1664888516563 = CreateCustomers1664888516563;