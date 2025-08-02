import { User } from 'src/users/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum ApplicationStatus {
  DRAFT = 'draft',
  SUBMITTED = 'submitted',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

@Entity()
export class Application {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user: User;

  @Column({ type: 'varchar', length: 255 })
  businessName: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  registrationNumber: string;

  @Column({ type: 'date' })
  dateOfIncorporation: Date;

  @Column({ type: 'varchar', length: 255 })
  businessType: string;

  @Column({ type: 'varchar', length: 255 })
  address: string;

  @Column({ type: 'varchar', length: 255 })
  contactEmail: string;

  @Column({ type: 'varchar', length: 20 })
  contactPhone: string;

  @Column({ type: 'simple-array', nullable: true })
  directorNames: string[];

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  paidUpCapital: number;

  @Column({ type: 'varchar', length: 255 })
  licenseType: string;

  @Column({
    type: 'enum',
    enum: ApplicationStatus,
    default: 'draft',
  })
  status: ApplicationStatus;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Column({ nullable: true, type: 'timestamp' })
  submittedAt: Date;
}
