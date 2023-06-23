import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
  })
  id: number;

  @Column({
    nullable: false,
    default: '',
  })
  username: string;

  @Column({
    nullable: false,
    type: 'varchar',
    name: 'password',
  })
  password: string;

  @Column({
    nullable: true,
    type: 'varchar',
    name: 'email',
  })
  email: string;
}
