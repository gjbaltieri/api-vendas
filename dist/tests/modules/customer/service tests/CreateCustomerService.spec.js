"use strict";

require("reflect-metadata");
var _CreateCustomerService = _interopRequireDefault(require("../../../../modules/customers/services/CreateCustomerService"));
var _AppError = _interopRequireDefault(require("../../../../shared/errors/AppError"));
var _fakeCustomerRepository = _interopRequireDefault(require("../fakeRepository/fakeCustomerRepository"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let fakeCustomerRepository;
let createCustomerService;
const MOCK_CUSTOMER = {
  name: 'FAKE NAME',
  email: 'fakemail@mail.com'
};
describe('Create customer suite tests', () => {
  beforeAll(async () => {
    fakeCustomerRepository = new _fakeCustomerRepository.default();
    createCustomerService = new _CreateCustomerService.default(fakeCustomerRepository);
    await createCustomerService.execute({
      name: 'OTHER FAKE NAME',
      email: 'fake@mail.com'
    });
  });
  it('should create customer', async () => {
    const customer = await createCustomerService.execute(MOCK_CUSTOMER);
    expect(customer).toHaveProperty('id');
  });
  it('should reject create customer - (email already exists)', async () => {
    expect(createCustomerService.execute({
      name: 'FAKE NAME',
      email: 'fake@mail.com'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});