import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';

export default class ProviderDayAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const provider_id = request.user.id;
    const { month, day, year } = request.body;
    const listProviderAppointmentsService = container.resolve(
      ListProviderAppointmentsService,
    );

    const providers = await listProviderAppointmentsService.execute({
      provider_id,
      day,
      month,
      year,
    });

    return response.json(providers);
  }
}
