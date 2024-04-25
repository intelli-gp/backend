import { udemyCourseCategories } from '../constants/udemy-course-categories';
/**
 * Represents a category on Udemy.
 */
export interface UdemyCategory {
  /**
   * Sort order of the category.
   */
  sort_order: number;
  /**
   * Name of the category.
   */
  title: string;
  /**
   * Lowercase, dash-spaced form of the title.
   */
  title_cleaned: string;
}

export interface UdemySubcategory extends UdemyCategory {
  /**
   * Parent category of the subcategory.
   */
  Category: UdemyCategory;
}

export type UdemyCourseCategoryEnum = (typeof udemyCourseCategories)[number];
