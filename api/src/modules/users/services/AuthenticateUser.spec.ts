import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import FakeUserRepository from '../repositories/Fakes/FakeUserRepository';
import AuthenticateUserService from './AuthenticateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';

describe('Authenticate User', () => {
  it('should be able to authenticate', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHash = new FakeHashProvider();

    const createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHash,
    );

    await createUserService.execute({
      name: 'John Doe',
      email: 'john1@example.com',
      password: '12345',
    });

    const authenticateUserService = new AuthenticateUserService(
      fakeUserRepository,
      fakeHash,
    );

    const authenticateUser = await authenticateUserService.execute({
      email: 'john1@example.com',
      password: '12345',
    });

    expect(authenticateUser).toHaveProperty('token');
  });
  it('should not be able to authenticate with in non existing user', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHash = new FakeHashProvider();

    const authenticateUserService = new AuthenticateUserService(
      fakeUserRepository,
      fakeHash,
    );

    expect(
      authenticateUserService.execute({
        email: 'john1@example.com',
        password: '12345',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to authenticate with wrong password', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHash = new FakeHashProvider();

    const createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHash,
    );

    await createUserService.execute({
      name: 'John Doe',
      email: 'john1@example.com',
      password: '12345',
    });

    const authenticateUserService = new AuthenticateUserService(
      fakeUserRepository,
      fakeHash,
    );

    expect(
      authenticateUserService.execute({
        email: 'john1@example.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
