import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUserRepository from '../repositories/Fakes/FakeUserRepository';
import UpdateProfilService from './UpdateProfileService';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfilService: UpdateProfilService;

describe('Update User Avatar', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfilService = new UpdateProfilService(
      fakeUserRepository,
      fakeHashProvider,
    );
  });
  it('should be able to update the profile', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: '12345',
    });

    const updateUser = await updateProfilService.execute({
      user_id: user.id,
      name: 'John Trê',
      email: 'john3@hotmail.com',
    });

    await expect(updateUser.name).toBe('John Trê');
  });
  it('should not be able to update the profile from non-existing user', async () => {
    await expect(
      updateProfilService.execute({
        user_id: 'non-existing-user-id',
        name: 'John Doe',
        email: 'john@example.com',
        password: '12345',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able update the profile', async () => {
    await fakeUserRepository.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: '12345',
    });

    const user = await fakeUserRepository.create({
      name: 'John Trê',
      email: 'john3@example.com',
      password: '12345',
    });

    await expect(
      updateProfilService.execute({
        user_id: user.id,
        name: 'John Trê',
        email: 'john@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should be able to update the passwor', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: '12345',
    });

    const updateUser = await updateProfilService.execute({
      user_id: user.id,
      name: 'John Trê',
      email: 'john3@hotmail.com',
      password: '123123',
      old_password: '12345',
    });

    await expect(updateUser.password).toBe('123123');
  });
  it('should not be able to update the passwor without old password', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: '12345',
    });

    await expect(
      updateProfilService.execute({
        user_id: user.id,
        name: 'John Trê',
        email: 'john3@hotmail.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to update the passwor with worng old password', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: '12345',
    });

    await expect(
      updateProfilService.execute({
        user_id: user.id,
        name: 'John Trê',
        email: 'john3@hotmail.com',
        password: '123123',
        old_password: 'wrong-old',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
