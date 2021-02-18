import { Request, Response } from 'express';

import { container } from 'tsyringe';

import ResetForgotPasswordEmailService from '@modules/users/services/ResetPasswordService';

export default class ResetPasswordServiceController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { password, token } = request.body;

    const resetForgotPasswordEmailService = container.resolve(
      ResetForgotPasswordEmailService,
    );

    await resetForgotPasswordEmailService.execute({
      password,
      token,
    });

    return response.status(204).json();
  }
}
