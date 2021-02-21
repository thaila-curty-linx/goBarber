import 'reflect-metadata';

import FakeUserRepository from '@modules/users/repositories/Fakes/FakeUserRepository';
import ListProvidersService from './ListProvidersService';

let fakeUserRepository: FakeUserRepository;
let listProvidersService: ListProvidersService;

describe('List Providers', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();

    listProvidersService = new ListProvidersService(fakeUserRepository);
  });
  it('should be able to list the providers', async () => {
    const user1 = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: '12345',
    });

    const user2 = await fakeUserRepository.create({
      name: 'John Trê',
      email: 'john3@example.com',
      password: '12345',
    });

    const loggedUser = await fakeUserRepository.create({
      name: 'John Qua',
      email: 'john4@example.com',
      password: '12345',
    });

    const providers = await listProvidersService.execute({
      user_id: loggedUser.id,
    });

    await expect(providers).toEqual([user1, user2]);
  });
});
