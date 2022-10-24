import 'reflect-metadata'
import CreateOrderService from '@modules/orders/services/CreateOrderService'
import CreateProductService from '@modules/products/services/CreateProductService'
import FakeProductRepository from '../../Products/fakeRepository/fakeProductRepository'
import FakeOrderRepository from '../fake repository/fakeOrderRepository'
import FakeCustomerRepository from '../../customer/fakeRepository/fakeCustomerRepository'
import CreateCustomerService from '@modules/customers/services/CreateCustomerService'
import { ICustomer } from '@shared/interface/relationship/ICustomer'
import { IProduct } from '@shared/interface/relationship/IProduct'
import { INewOrder } from '@modules/orders/domain/interfaces/models/INewOrder'
import AppError from '@shared/errors/AppError'

let fakeOrdersRepository: FakeOrderRepository
let fakeCustomerRepository: FakeCustomerRepository
let fakeProductRepository: FakeProductRepository

let createProductService: CreateProductService
let createCustomerService: CreateCustomerService
let createOrderService: CreateOrderService

let MOCK_FAKE_PRODUCT: IProduct
let MOCK_SECOND_PRODUCT: IProduct
let MOCK_FAKE_CUSTOMER: ICustomer

describe.only('Create order suite tests', () => {
  beforeAll(async () => {
    fakeProductRepository = new FakeProductRepository()
    createProductService = new CreateProductService(fakeProductRepository)
    MOCK_FAKE_PRODUCT = await createProductService.execute({ name: 'FAKE_PRODUCT', price: 10, quantity: 5 })
    MOCK_SECOND_PRODUCT = await createProductService.execute({ name: 'ANOTHER_FAKE_PRODUCT', price: 100, quantity: 50 })

    fakeCustomerRepository = new FakeCustomerRepository()
    createCustomerService = new CreateCustomerService(fakeCustomerRepository)
    MOCK_FAKE_CUSTOMER = await createCustomerService.execute({ name: 'Fake_Customer', email: 'fake@mail.com' })

    fakeOrdersRepository = new FakeOrderRepository()
    createOrderService = new CreateOrderService(fakeOrdersRepository, fakeProductRepository, fakeCustomerRepository)
  })
  it('should create order', async () => {
    const productList = {
      customer_id: MOCK_FAKE_CUSTOMER.id,
      products: [{ id: MOCK_FAKE_PRODUCT.id, quantity: 1 }],
    } as INewOrder
    const order = await createOrderService.execute(productList)
    expect(order).toHaveProperty('order_products')
  })
  it('should reject create order - (user not found)', async () => {
    const productList = {
      customer_id: 'INVALID_ID',
      products: [{ id: MOCK_FAKE_PRODUCT.id, quantity: 1 }],
    } as INewOrder
    expect(createOrderService.execute(productList)).rejects.toBeInstanceOf(AppError)
  })
  it('should reject create order - ( 0 products found)', async () => {
    const productList = {
      customer_id: MOCK_FAKE_CUSTOMER.id,
      products: [{ id: 'INVALID_PRODUCT_ID', quantity: 1 }],
    } as INewOrder
    expect(createOrderService.execute(productList)).rejects.toBeInstanceOf(AppError)
  })
  it('should reject create order - (One product not found)', async () => {
    const productList = {
      customer_id: MOCK_FAKE_CUSTOMER.id,
      products: [
        { id: MOCK_FAKE_PRODUCT.id, quantity: 1 },
        { id: 'INVALID_PRODUCT_ID', quantity: 1 },
      ],
    } as INewOrder
    expect(createOrderService.execute(productList)).rejects.toBeInstanceOf(AppError)
  })
  it('should reject create order - (product quantity unvailable)', async () => {
    const productList = {
      customer_id: MOCK_FAKE_CUSTOMER.id,
      products: [
        { id: MOCK_FAKE_PRODUCT.id, quantity: 1 },
        { id: MOCK_SECOND_PRODUCT.id, quantity: MOCK_SECOND_PRODUCT.quantity + 1 },
      ],
    } as INewOrder
    expect(createOrderService.execute(productList)).rejects.toBeInstanceOf(AppError)
  })
})
