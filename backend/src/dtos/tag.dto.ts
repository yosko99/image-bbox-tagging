import { IsBoolean, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

enum Urgency {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}

export class CreateTagRequest {
  @IsNotEmpty()
  @IsString()
  @MaxLength(250)
  @ApiProperty()
  instructions: string;

  @ApiProperty()
  image?: Express.Multer.File;

  @ApiProperty({ type: [String], required: false })
  objectsToAnnotate: string[];

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty({ type: Boolean })
  withLabels: boolean;

  @IsNotEmpty()
  @ApiProperty({ enum: Urgency })
  urgency: Urgency;
}
