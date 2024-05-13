import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { PaginationDto } from 'src/common/dto';

export class SearchDto extends PaginationDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: 'pizza hu',
        description: 'The search term',
        required: true,
    })
    searchTerm: string;
}
