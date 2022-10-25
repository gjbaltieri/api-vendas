"use strict";

require("reflect-metadata");
var _CreateCustomerService = _interopRequireDefault(require("../../../../modules/customers/services/CreateCustomerService"));
var _AppError = _interopRequireDefault(require("../../../../shared/errors/AppError"));
var _fakeCustomerRepository = _interopRequireDefault(require("../fakeRepository/fakeCustomerRepository"));
var _ListOneCustomerService = _interopRequireDefault(require("../../../../modules/customers/services/ListOneCustomerService"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let fakeCustomerRepository;
let createCustomerService;
let listOneCustomerService;
let MOCK_CUSTOMER;
describe('List one customer suite tests', () => {
  beforeAll(async () => {
    fakeCustomerRepository = new _fakeCustomerRepository.default();
    listOneCustomerService = new _ListOneCustomerService.default(fakeCustomerRepository);
    createCustomerService = new _CreateCustomerService.default(fakeCustomerRepository);
    MOCK_CUSTOMER = await createCustomerService.execute({
      name: 'OTHER FAKE NAME',
      email: 'fake@mail.com'
    });
  });
  it('should return one customer', async () => {
    const customer = await listOneCustomerService.execute({
      id: MOCK_CUSTOMER.id
    });
    expect(MOCK_CUSTOMER.id === customer.id);
  });
  it('should reject return one customer - (customer not found)', async () => {
    expect(listOneCustomerService.execute({
      id: 'INVALID_ID'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});