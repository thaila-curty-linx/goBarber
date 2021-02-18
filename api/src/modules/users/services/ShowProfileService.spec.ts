import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import FakeUserRepository from '../repositories/Fakes/FakeUserRepository';
import ShowProfileService from './ShowProfileServices';

let fakeUserRepository: FakeUserRepository;
let showProfileService: ShowProfileService;

describe('Update User Avatar', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();

    showProfileService = new ShowProfileService(fakeUserRepository);
  });
  it('should be able to show the profile', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: '12345',
    });

    const profile = await showProfileService.execute({
      user_id: user.id,
    });

    await expect(profile.name).toBe('John Doe');
    await expect(profile.email).toBe('john@example.com');
  });

  it('should not be able to show the profile from non-existing user', async () => {
    await expect(
      showProfileService.execute({
        user_id: 'non-existing-user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
