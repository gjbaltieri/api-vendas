import { DeleteResult, getCustomRepository } from 'typeorm'
import UserRepository from '../../typeorm/repository/UsersRepository'

class deleteAllUserService {
  public async execute(): Promise<DeleteResult> {
    const userRepository = getCustomRepository(UserRepository)
    const deleteAll = await userRepository.delete({})
    return deleteAll
  }
}

export default deleteAllUserService
