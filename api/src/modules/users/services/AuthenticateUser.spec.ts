import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import FakeUserRepository from '../repositories/Fakes/FakeUserRepository';
import AuthenticateUserService from './AuthenticateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';

let fakeUserRepository: FakeUserRepository;
let fakeHash: FakeHashProvider;
let createUserService: CreateUserService;
let authenticateUserService: AuthenticateUserService;

describe('Authenticate User', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHash = new FakeHashProvider();

    createUserService = new CreateUserService(fakeUserRepository, fakeHash);
    authenticateUserService = new AuthenticateUserService(
      fakeUserRepository,
      fakeHash,
    );
  });

  it('should be able to authenticate', async () => {
    await createUserService.execute({
      name: 'John Doe',
      email: 'john1@example.com',
      password: '12345',
    });

    const authenticateUser = await authenticateUserService.execute({
      email: 'john1@example.com',
      password: '12345',
    });

    await expect(authenticateUser).toHaveProperty('token');
  });
  it('should not be able to authenticate with in non existing user', async () => {
    await expect(
      authenticateUserService.execute({
        email: 'john1@example.com',
        password: '12345',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to authenticate with wrong password', async () => {
    await createUserService.execute({
      name: 'John Doe',
      email: 'john1@example.com',
      password: '12345',
    });

    await expect(
      authenticateUserService.execute({
        email: 'john1@example.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
