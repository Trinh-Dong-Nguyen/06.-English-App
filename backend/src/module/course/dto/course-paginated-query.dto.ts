import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsNumber, Min, IsString, IsIn } from 'class-validator';

export class CoursePaginatedQuery {
  @IsOptional()
  @IsNumber()
  @Min(1)
  @ApiProperty({
    required: false,
    default: 1,
    description: 'Page number',
  })
  @Type(() => Number)
  readonly page: number = 1;

  @IsOptional()
  @ApiProperty({
    required: false,
    default: 10,
    description: 'Number of items per page',
  })
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  readonly take: number = 10;

  @IsOptional()
  @IsString()
  @ApiProperty({
    required: false,
    default: 'asc',
    description: 'Sort order',
  })
  @IsIn(['asc', 'desc'])
  readonly sort: 'asc' | 'desc' = 'asc';

  @IsOptional()
  @ApiProperty({
    required: false,
    default: 'createdAt',
    description: 'Sort by field',
  })
  @IsString()
  readonly sortBy: string = 'createdAt';

  @IsOptional()
  @IsString()
  @ApiProperty({
    required: false,
    default: '',
    description: 'Search keyword',
  })
  readonly search: string = '';
  get skip(): number {
    return (this.page - 1) * this.take;
  }
}
