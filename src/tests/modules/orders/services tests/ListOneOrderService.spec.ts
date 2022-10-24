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
import { IOrder } from '@shared/interface/relationship/IOrder'
import ListOneOrderService from '@modules/orders/services/ListOneOrderService'

let fakeOrdersRepository: FakeOrderRepository
let fakeCustomerRepository: FakeCustomerRepository
let fakeProductRepository: FakeProductRepository

let createProductService: CreateProductService
let createCustomerService: CreateCustomerService
let createOrderService: CreateOrderService

let listOneOrderService: ListOneOrderService

let MOCK_FAKE_PRODUCT: IProduct
let MOCK_SECOND_PRODUCT: IProduct
let MOCK_FAKE_CUSTOMER: ICustomer
let MOCK_ORDER: IOrder

describe.only('List one orders suite tests', () => {
  beforeAll(async () => {
    fakeOrdersRepository = new FakeOrderRepository()
    fakeProductRepository = new FakeProductRepository()
    createProductService = new CreateProductService(fakeProductRepository)
    listOneOrderService = new ListOneOrderService(fakeOrdersRepository)
    MOCK_FAKE_PRODUCT = await createProductService.execute({ name: 'FAKE_PRODUCT', price: 10, quantity: 5 })
    MOCK_SECOND_PRODUCT = await createProductService.execute({ name: 'ANOTHER_FAKE_PRODUCT', price: 100, quantity: 50 })

    fakeCustomerRepository = new FakeCustomerRepository()
    createCustomerService = new CreateCustomerService(fakeCustomerRepository)
    MOCK_FAKE_CUSTOMER = await createCustomerService.execute({ name: 'Fake_Customer', email: 'fake@mail.com' })

    createOrderService = new CreateOrderService(fakeOrdersRepository, fakeProductRepository, fakeCustomerRepository)
    const productList = {
      customer_id: MOCK_FAKE_CUSTOMER.id,
      products: [{ id: MOCK_FAKE_PRODUCT.id, quantity: 1 }],
    } as INewOrder
    MOCK_ORDER = await createOrderService.execute(productList)
  })
  it('should list one order', async () => {
    const orders = await listOneOrderService.execute(MOCK_ORDER.id)
    expect(orders).toHaveProperty('order_products')
  })
  it('should reject list one order - (order not found)', async () => {
    expect(listOneOrderService.execute('INVALID_ORDER_ID')).rejects.toBeInstanceOf(AppError)
  })
})
