import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import FakeUserRepository from '../repositories/Fakes/FakeUserRepository';
import ResetPasswordEmailService from './ResetPasswordService';
import FakeUserTokensRepository from '../repositories/Fakes/FakeUserTokensRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUserRepository: FakeUserRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let resetPasswordEmailService: ResetPasswordEmailService;
let fakeHashProvider: FakeHashProvider;

describe('Reset Password', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    fakeHashProvider = new FakeHashProvider();
    resetPasswordEmailService = new ResetPasswordEmailService(
      fakeUserRepository,
      fakeUserTokensRepository,
      fakeHashProvider,
    );
  });
  it('should be able to reset the password', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: '1234567',
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);

    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

    await resetPasswordEmailService.execute({
      password: '1234',
      token,
    });

    const updatedUser = await fakeUserRepository.findById(user.id);

    await expect(generateHash).toHaveBeenCalledWith('1234');
    await expect(updatedUser?.password).toBe('1234');
  });

  it('should not be able to reset the password with non-existing token', async () => {
    await expect(
      resetPasswordEmailService.execute({
        password: '1234',
        token: 'non-existing-token',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to reset the password with non-existing user', async () => {
    const { token } = await fakeUserTokensRepository.generate(
      'non-existing-user',
    );

    await expect(
      resetPasswordEmailService.execute({
        password: '1234',
        token,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset the password if passed more than 2 hours', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: '1234567',
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);

    jest.spyOn(Date, 'now').mockImplementation(() => {
      const customDate = new Date();
      return customDate.setHours(customDate.getHours() + 3);
    });

    await expect(
      resetPasswordEmailService.execute({
        password: '1234',
        token,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
