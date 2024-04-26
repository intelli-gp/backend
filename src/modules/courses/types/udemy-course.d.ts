import { UdemyCategory, UdemySubcategory } from './udemy-category';
import { UdemyUserProfile } from './udemy-instructor';

export interface UdemyCourse {
  /**
   * When the course was archived by the request sender.
   */
  archive_time?: string;
  /**
   * Average course rating.
   */
  avg_rating?: number;
  /**
   * How much of the course the request sender completed.
   */
  completion_ratio?: number;
  /**
   * When the course was created.
   */
  created?: string;
  /**
   * An HTML based detailed description of the course.
   */
  description?: string;
  /**
   * When the course was favorited by the request sender.
   */
  favorite_time?: string;
  /**
   * A short tweetable description of the course.
   */
  headline?: string;
  /**
   * Course image, dimensions 100x100.
   */
  image_100x100?: string;
  /**
   * Course image, dimensions 125_H.
   */
  image_125_H?: string;
  /**
   * Course image, dimensions 200_H.
   */
  image_200_H?: string;
  /**
   * Course image, dimensions 240x135.
   */
  image_240x135?: string;
  /**
   * Course image, dimensions 304x171.
   */
  image_304x171?: string;
  /**
   * Course image, dimensions 480x270.
   */
  image_480x270?: string;
  /**
   * Course image, dimensions 48x27.
   */
  image_48x27?: string;
  /**
   * Course image, dimensions 50x50.
   */
  image_50x50?: string;
  /**
   * Course image, dimensions 75x75.
   */
  image_75x75?: string;
  /**
   * Course image, dimensions 96x54.
   */
  image_96x54?: string;
  /**
   * Whether the course is in any UB content collections.
   */
  is_in_any_ufb_content_collection?: boolean;
  /**
   * Whether the course is paid.
   */
  is_paid?: boolean;
  /**
   * Whether the course is private.
   */
  is_private?: boolean;
  /**
   * Whether the course is wishlisted by the request sender.
   */
  is_wishlisted?: boolean;
  /**
   * Locale of the course.
   */
  locale?: string;
  /**
   * Number of lectures in the course.
   */
  num_lectures?: number;
  /**
   * Number of generic quizzes in the course.
   */
  num_quizzes?: number;
  /**
   * Number of reviews for the course.
   */
  num_reviews?: number;
  /**
   * Number of students enrolled in the course.
   */
  num_subscribers?: number;
  /**
   * How much the course costs.
   */
  price?: number;
  /**
   * A CourseCategory object describing the primary category of the course.
   */
  primary_category?: UdemyCategory;
  /**
   * A CourseSubcategory object describing the primary subcategory of the course.
   */
  primary_subcategory?: UdemySubcategory;
  /**
   * Course status.
   */
  status_label?: string;
  /**
   * Title of the course.
   */
  title: string;
  /**
   * URL of the course dashboard page.
   */
  url: string;
  /**
   * An array of user objects which state the instructors of the course.
   */
  visible_instructors?: UdemyUserProfile[];
}
