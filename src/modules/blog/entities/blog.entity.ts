import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('blogs') // Specify the table name
export class Blog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false }) // Not null
  title: string;

  @Column({ nullable: false }) // Not null
  description: string;

  @Column({ nullable: false }) // Not null
  image: string;

  @Column({
    name: 'created_date',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdDate: Date;

  @Column({
    name: 'updated_date',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedDate: Date;
}
