import { UdemyCourse } from '../types/udemy-course';

export const previewRequiredCourseFields: (keyof UdemyCourse)[] = [
    'title',
    'headline',
    'primary_category',
    'primary_subcategory',
    'num_reviews',
    'avg_rating',
    'image_304x171',
    'url',
    'visible_instructors',
    'price',
] as const;
