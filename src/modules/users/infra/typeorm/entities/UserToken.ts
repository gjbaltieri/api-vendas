import { IUserToken } from '@modules/users/domain/interfaces/models/IUserToken'
import { Column, CreateDateColumn, Entity, Generated, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity('user_tokens')
class UserToken implements IUserToken {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  @Generated('uuid')
  token: string

  @Column('varchar')
  user_id: string

  @CreateDateColumn({ type: 'timestamp with time zone' })
  created_At: Date

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updated_At: Date
}

export default UserToken
