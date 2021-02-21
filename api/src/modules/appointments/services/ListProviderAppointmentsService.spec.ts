import 'reflect-metadata';

import FakeAppointmentRepository from '../repositories/Fakes/FakeAppointmentRepository';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';

let fakeAppointmentRepository: FakeAppointmentRepository;
let listProviderAppointmentsService: ListProviderAppointmentsService;

describe('List Provider Appointments', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository();

    listProviderAppointmentsService = new ListProviderAppointmentsService(
      fakeAppointmentRepository,
    );
  });
  it('should be able to list appointments  on a specific day', async () => {
    const appointment1 = await fakeAppointmentRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2020, 4, 20, 13, 0, 0),
    });
    const appointment2 = await fakeAppointmentRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2020, 4, 20, 15, 0, 0),
    });

    const appointments = await listProviderAppointmentsService.execute({
      provider_id: 'provider',
      year: 2020,
      month: 5,
      day: 20,
    });

    await expect(appointments).toEqual([appointment1, appointment2]);
  });
});
