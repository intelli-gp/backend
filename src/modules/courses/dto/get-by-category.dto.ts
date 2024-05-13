import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { IsValidUdemyCourseCategory } from 'src/utils/class-validator-decorators/udemy-course-category.decorator';

export class GetCourseByCategoryDto {
    @ApiProperty({
        description: 'Category',
        example: 'Development',
    })
    @IsString()
    @IsNotEmpty()
    @IsValidUdemyCourseCategory()
    category: string;
}
