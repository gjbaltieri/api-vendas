"use strict";

require("reflect-metadata");
var _CreateCustomerService = _interopRequireDefault(require("../../../../modules/customers/services/CreateCustomerService"));
var _fakeCustomerRepository = _interopRequireDefault(require("../fakeRepository/fakeCustomerRepository"));
var _listAllCustomerService = _interopRequireDefault(require("../../../../modules/customers/services/listAllCustomerService"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let fakeCustomerRepository;
let createCustomerService;
let listAllCustomerService;
describe('List All customer suite tests', () => {
  beforeAll(async () => {
    fakeCustomerRepository = new _fakeCustomerRepository.default();
    listAllCustomerService = new _listAllCustomerService.default(fakeCustomerRepository);
    createCustomerService = new _CreateCustomerService.default(fakeCustomerRepository);
    await createCustomerService.execute({
      name: 'FAKE NAME',
      email: 'fake@mail.com'
    });
    await createCustomerService.execute({
      name: 'OTHER FAKE NAME',
      email: 'another_fake@mail.com'
    });
  });
  it('should return all customers', async () => {
    const customers = await listAllCustomerService.execute();
    console.log('list all', customers);
    expect(customers).toHaveProperty('data');
  });
});