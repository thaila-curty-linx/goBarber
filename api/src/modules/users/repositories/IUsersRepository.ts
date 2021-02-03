import ICreateUsersDTO from '@modules/users/dtos/ICreateUsersDTO';
import User from '../infra/typeorm/entities/User';

export default interface IUsersRepositories {
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create(data: ICreateUsersDTO): Promise<User>;
  save(user: User): Promise<User>;
}
