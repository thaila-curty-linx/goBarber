import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import FakeUserRepository from '../repositories/Fakes/FakeUserRepository';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

describe('Create User', () => {
  it('should be able to create a new user', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHash = new FakeHashProvider();

    const createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHash,
    );

    const user = await createUserService.execute({
      name: 'John Doe',
      email: 'john@example.com',
      password: '12345',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with same email from another', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHash = new FakeHashProvider();

    const createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHash,
    );

    await createUserService.execute({
      name: 'John Doe',
      email: 'john@example.com',
      password: '12345',
    });

    expect(
      createUserService.execute({
        name: 'John Doe',
        email: 'john@example.com',
        password: '12345',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
