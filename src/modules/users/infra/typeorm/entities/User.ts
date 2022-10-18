import { IUser } from '@modules/users/domain/interfaces/models/IUser'
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity('users')
class User implements IUser {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column('varchar')
  email: string

  @Column('varchar')
  password: string

  @Column({ type: 'varchar', default: null })
  avatar: string

  @CreateDateColumn({ type: 'timestamp with time zone' })
  created_At: Date

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updated_At: Date
}

export default User
