import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import FakeAppointmentRepository from '../repositories/Fakes/FakeAppointmentRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentRepository: FakeAppointmentRepository;
let createAppointmentService: CreateAppointmentService;

describe('Create Appointment', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository();
    createAppointmentService = new CreateAppointmentService(
      fakeAppointmentRepository,
    );
  });
  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    const appointment = await createAppointmentService.execute({
      date: new Date(2020, 4, 10, 13),
      provider_id: '1112',
      user_id: 'user',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('1112');
  });

  it('should not be able to create two appointments in the same time', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    const appointmentDate = new Date(2020, 4, 10, 13);

    await createAppointmentService.execute({
      user_id: '1234',
      date: appointmentDate,
      provider_id: '123',
    });

    expect(
      createAppointmentService.execute({
        date: appointmentDate,
        provider_id: '123',
        user_id: 'user',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to create an appointment on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    expect(
      createAppointmentService.execute({
        date: new Date(2020, 4, 10, 11),
        provider_id: '123',
        user_id: 'user',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to create an appointment with same user as provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    expect(
      createAppointmentService.execute({
        date: new Date(2020, 4, 10, 13),
        provider_id: 'user',
        user_id: 'user',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to create an appointment before 8am and after 5pm', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    expect(
      createAppointmentService.execute({
        date: new Date(2020, 4, 11, 7),
        provider_id: 'provider1',
        user_id: 'user1',
      }),
    ).rejects.toBeInstanceOf(AppError);
    expect(
      createAppointmentService.execute({
        date: new Date(2020, 4, 11, 18),
        provider_id: 'provider1',
        user_id: 'user1',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
