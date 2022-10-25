"use strict";

require("reflect-metadata");
var _CreateCustomerService = _interopRequireDefault(require("../../../../modules/customers/services/CreateCustomerService"));
var _AppError = _interopRequireDefault(require("../../../../shared/errors/AppError"));
var _fakeCustomerRepository = _interopRequireDefault(require("../fakeRepository/fakeCustomerRepository"));
var _UpdateCustomerService = _interopRequireDefault(require("../../../../modules/customers/services/UpdateCustomerService"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let fakeCustomerRepository;
let createCustomerService;
let updateCustomerService;
let MOCK_CUSTOMER;
describe('Update customer suite tests', () => {
  beforeAll(async () => {
    fakeCustomerRepository = new _fakeCustomerRepository.default();
    updateCustomerService = new _UpdateCustomerService.default(fakeCustomerRepository);
    createCustomerService = new _CreateCustomerService.default(fakeCustomerRepository);
    MOCK_CUSTOMER = await createCustomerService.execute({
      name: 'FAKE NAME',
      email: 'fakemail@mail.com'
    });
    await createCustomerService.execute({
      name: 'FAKE NAME',
      email: 'another_fakemail@mail.com'
    });
  });
  it('should update customer', async () => {
    const data = {
      id: MOCK_CUSTOMER.id,
      name: 'UPDATED FAKE NAME',
      email: 'updatefake@mail.com'
    };
    const customer = await updateCustomerService.execute(data);
    expect(customer).not.toBeInstanceOf(_AppError.default);
  });
  it('should reject update customer - (customer not found)', async () => {
    const data = {
      id: 'f070341d-89d4-49d5-8424-831715fb443a',
      name: 'UPDATED FAKE NAME',
      email: 'updatefake@mail.com'
    };
    expect(updateCustomerService.execute(data)).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should reject update customer - (email already exists)', async () => {
    const data = {
      id: MOCK_CUSTOMER.id,
      name: 'UPDATED FAKE NAME',
      email: 'another_fakemail@mail.com'
    };
    expect(updateCustomerService.execute(data)).rejects.toBeInstanceOf(_AppError.default);
  });
});