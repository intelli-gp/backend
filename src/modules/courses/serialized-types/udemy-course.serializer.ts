import { UdemyCourse } from '../types';

export class SerializedUdemyCourse {
  /**
   * Title of the course
   */
  Title: string;

  /**
   * A short tweetable description of the course.
   */
  Headline: string;

  /**
   * Primary category of the course
   */
  PrimaryCategory: string;

  /**
   * Primary subcategory of the course
   */
  PrimarySubcategory: string;

  /**
   * Number of reviews the course has
   */
  NumReviews: number;

  /**
   * Average rating of the course
   */
  AvgRating: number;

  /**
   * URL to the course's thumbnail
   */
  Thumbnail: string;

  /**
   * List of instructor names for the course
   */
  Instructors: string[];

  /**
   * Price of the course with currency symbol
   */
  Price: number;

  /**
   * URL to the course's page
   */
  RedirectUrl: string;

  constructor(partial: Partial<UdemyCourse>) {
    this.Title = partial?.title;
    this.Headline = partial?.headline;
    this.PrimaryCategory = partial?.primary_category?.title;
    this.PrimarySubcategory = partial?.primary_subcategory?.title;
    this.NumReviews = partial?.num_reviews;
    this.AvgRating = partial?.avg_rating;
    this.Thumbnail = partial?.image_304x171;
    this.Instructors = partial.visible_instructors.map(
      (instructor) => instructor?.display_name,
    );
    this.Price = partial?.price;
    this.RedirectUrl = partial?.url;
  }
}
