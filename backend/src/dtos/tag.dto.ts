import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

enum Urgency {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}

export class Coordinate {
  width: number;
  height: number;
  x: number;
  y: number;
  label: string;
}

export class CreateTagRequest {
  @IsNotEmpty()
  @IsString()
  @MaxLength(250)
  @ApiProperty()
  instructions: string;

  @ApiProperty()
  image: Express.Multer.File;

  @ApiProperty({ type: [String] })
  objectsToAnnotate: string[];

  @IsNotEmpty()
  @ApiProperty({ enum: Urgency })
  urgency: Urgency;
}

export class CompleteTagRequest {
  @ApiProperty({ required: false })
  message?: string;

  @ApiProperty()
  image: Express.Multer.File;

  @ApiProperty({
    type: Coordinate,
    isArray: true,
  })
  coordinates: Coordinate[];
}
