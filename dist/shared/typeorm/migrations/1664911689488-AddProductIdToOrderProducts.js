"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AddProductIdToOrderProducts1664911689488 = void 0;
var _typeorm = require("typeorm");
class AddProductIdToOrderProducts1664911689488 {
  async up(queryRunner) {
    await queryRunner.addColumn('orders_products', new _typeorm.TableColumn({
      name: 'product_id',
      type: 'uuid',
      isNullable: true
    }));
    await queryRunner.createForeignKey('orders_products', new _typeorm.TableForeignKey({
      name: 'OrdersProductsProduct',
      columnNames: ['product_id'],
      referencedTableName: 'products',
      referencedColumnNames: ['id'],
      onDelete: 'SET NULL'
    }));
  }
  async down(queryRunner) {
    await queryRunner.dropForeignKey('orders_products', 'OrdersProductsProduct');
    await queryRunner.dropColumn('orders_products', 'product_id');
  }
}
exports.AddProductIdToOrderProducts1664911689488 = AddProductIdToOrderProducts1664911689488;