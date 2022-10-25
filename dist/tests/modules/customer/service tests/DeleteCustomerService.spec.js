"use strict";

require("reflect-metadata");
var _CreateCustomerService = _interopRequireDefault(require("../../../../modules/customers/services/CreateCustomerService"));
var _AppError = _interopRequireDefault(require("../../../../shared/errors/AppError"));
var _fakeCustomerRepository = _interopRequireDefault(require("../fakeRepository/fakeCustomerRepository"));
var _DeleteCustomerService = _interopRequireDefault(require("../../../../modules/customers/services/DeleteCustomerService"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let fakeCustomerRepository;
let deleteCustomerService;
let createCustomerService;
let MOCK_CUSTOMER;
describe('Delete customer suite tests', () => {
  beforeAll(async () => {
    fakeCustomerRepository = new _fakeCustomerRepository.default();
    deleteCustomerService = new _DeleteCustomerService.default(fakeCustomerRepository);
    createCustomerService = new _CreateCustomerService.default(fakeCustomerRepository);
    MOCK_CUSTOMER = await createCustomerService.execute({
      name: 'OTHER FAKE NAME',
      email: 'fake@mail.com'
    });
  });
  it('should delete customer', async () => {
    const customer = await deleteCustomerService.execute({
      id: MOCK_CUSTOMER.id
    });
    expect(customer).toBe(void 0);
  });
  it('should reject delete customer - (customer not found)', async () => {
    expect(deleteCustomerService.execute({
      id: 'INVALID_ID'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});