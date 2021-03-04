import 'reflect-metadata';

import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import AppError from '@shared/errors/AppError';
import FakeUserRepository from '../repositories/Fakes/FakeUserRepository';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUserRepository: FakeUserRepository;
let fakeHash: FakeHashProvider;
let fakeCacheProvider: FakeCacheProvider;
let createUserService: CreateUserService;

describe('Create User', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHash = new FakeHashProvider();
    fakeCacheProvider = new FakeCacheProvider();

    createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHash,
      fakeCacheProvider,
    );
  });

  it('should be able to create a new user', async () => {
    const user = await createUserService.execute({
      name: 'John Doe',
      email: 'john@example.com',
      password: '12345',
    });

    await expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with same email from another', async () => {
    await createUserService.execute({
      name: 'John Doe',
      email: 'john@example.com',
      password: '12345',
    });

    await expect(
      createUserService.execute({
        name: 'John Doe',
        email: 'john@example.com',
        password: '12345',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
