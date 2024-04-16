import { UdemyCourse } from '../types';

export class SerializedUdemyCourse {
  Title: string;

  Headline: string;

  PrimaryCategory: string;

  PrimarySubcategory: string;

  NumReviews: number;

  AvgRating: number;

  Thumbnail: string;

  Instructors: string[];

  Price: number;

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
