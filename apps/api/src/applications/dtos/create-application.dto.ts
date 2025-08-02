import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { ApplicationStatus } from '../application.entity';

export enum ApplicationType {
  NEW = 'new',
  RENEWAL = 'renewal',
}

export class CreateApplicationDto {
  @IsString()
  @IsNotEmpty()
  businessName: string;

  @IsString()
  @IsNotEmpty()
  registrationNumber: string;

  @IsDateString()
  dateOfIncorporation: string;

  @IsString()
  @IsNotEmpty()
  businessType: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsEmail()
  contactEmail: string;

  @IsString()
  @IsNotEmpty()
  contactPhone: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  directorNames: string[];

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  @Type(() => Number)
  paidUpCapital: number;

  @IsString()
  licenseType: string;

  // status should always be "draft" on creation (or optional)
  @IsOptional()
  @IsEnum(ApplicationStatus)
  status?: ApplicationStatus;
}
