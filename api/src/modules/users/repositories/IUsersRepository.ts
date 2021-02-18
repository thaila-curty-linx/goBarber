import ICreateUsersDTO from '@modules/users/dtos/ICreateUsersDTO';
import IFindAllProviderDTO from '@modules/users/dtos/IFindAllProviderDTO';
import User from '../infra/typeorm/entities/User';

export default interface IUsersRepositories {
  findAllProviders(data?: IFindAllProviderDTO): Promise<User[]>;
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create(data: ICreateUsersDTO): Promise<User>;
  save(user: User): Promise<User>;
}
