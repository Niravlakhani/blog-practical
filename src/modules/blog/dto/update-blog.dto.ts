import { ApiProperty } from '@nestjs/swagger';

export class UpdateBlogDto {
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  image: string;

  created_date: string;
}
