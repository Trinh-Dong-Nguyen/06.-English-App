import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  ValidateIf,
} from 'class-validator';
import { IsPasswordStrong } from '../../../common/validators/is-strong-password.validator';
import { IsValidDOB } from '../../../common/validators/is-valid-dob.validator';
import { AutoMap } from '@automapper/classes';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RegisterAuthDto {
  @AutoMap()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Unique username for the user',
    default: 'guest_user',
  })
  username: string;

  @AutoMap()
  @IsEmail()
  @ApiProperty({ description: 'Valid email address' })
  email: string;

  @AutoMap()
  @IsPasswordStrong()
  @ApiProperty({
    description: 'Password for the account',
    minLength: 8,
    default: '*^0x,S.-89;b!O^r',
  })
  password: string;

  @AutoMap()
  @IsEnum(['TEACHER', 'STUDENT'], {
    message: 'Role must be either TEACHER or STUDENT',
  })
  @ApiProperty({
    enum: ['TEACHER', 'STUDENT'],
    description: 'Role of the user',
  })
  role: 'TEACHER' | 'STUDENT';

  @AutoMap()
  @IsOptional()
  @ApiProperty({ description: 'First name of the user', default: 'John' })
  firstName?: string; // Nullable field

  @AutoMap()
  @IsOptional()
  @ApiProperty({ description: 'Last name of the user', default: 'Doe' })
  lastName?: string; // Nullable field

  @AutoMap()
  @IsOptional()
  @ApiProperty({
    description: 'Phone number of the user',
    default: '1234567890',
  })
  phone?: string; // Nullable field

  @AutoMap()
  @IsValidDOB()
  @IsOptional()
  @ApiProperty({ description: 'Date of birth', default: '1990-01-01' })
  birthDate?: Date;
  @ValidateIf((o) => o.role === 'TEACHER')
  @IsNotEmpty({ message: 'Degree is required for teachers' })
  @ApiPropertyOptional({
    enum: ['BACHELOR', 'MASTER', 'DOCTOR', 'UNKNOWN'],
    description: 'Degree of the teacher',
  })
  degree?: string;
  @ValidateIf((o) => o.role === 'STUDENT')
  @IsNotEmpty({ message: 'School name is required for students' })
  @ApiPropertyOptional({ description: 'School name of the student' })
  schoolName?: string;
}
