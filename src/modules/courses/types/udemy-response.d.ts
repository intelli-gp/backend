import { UdemyCourse } from './udemy-course';

export interface UdemyApiResponse {
  count: number;
  next: string;
  previous: string;
  results: UdemyCourse[];
}
