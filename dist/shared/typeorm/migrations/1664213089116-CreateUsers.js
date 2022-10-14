"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateUsers1664213089116 = void 0;
var _typeorm = require("typeorm");
class CreateUsers1664213089116 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'users',
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
        name: 'password',
        type: 'varchar'
      }, {
        name: 'avatar',
        type: 'varchar',
        isNullable: true
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
    await queryRunner.dropTable('users');
  }
}
exports.CreateUsers1664213089116 = CreateUsers1664213089116;