import { PaginationDto } from 'src/common/dto';
import { UdemyCourse } from '../types';
import { SerializedUdemyCourse } from './udemy-course.serializer';

// export class SerializedPaginatedUdemyCourses {
//   /**
//    * Total number of courses in this page
//    */
//   Count: number;
//   /**
//    * Total number of pages
//    */
//   NumPages: number;
//   /**
//    * Next page number
//    */
//   NextPageNum: number | null;
//   /**
//    * Current page number
//    */
//   CurrentPageNum: number;
//   /**
//    * Previous page number
//    */
//   PreviousPageNum: number | null;
//   /**
//    * Number of courses per page (not necessarily the number of courses in this page)
//    */
//   LimitPerPage: number;
//   /**
//    * List of courses in this page
//    */
//   Results: SerializedUdemyCourse[];

//   constructor(
//     courses: Partial<UdemyCourse[]>,
//     paginationData: PaginationDto,
//     totalCoursesCount: number,
//   ) {
//     this.Count = courses?.length;
//     this.NumPages = Math.ceil(+totalCoursesCount / +paginationData?.limit);
//     this.CurrentPageNum = +paginationData?.offset || 1;
//     this.NextPageNum =
//       this.CurrentPageNum + 1 > this.NumPages ? null : this.CurrentPageNum + 1;
//     this.PreviousPageNum =
//       this.CurrentPageNum - 1 < 1 ? null : this.CurrentPageNum - 1;
//     this.LimitPerPage = paginationData?.limit;
//     this.Results = courses.map((course) => new SerializedUdemyCourse(course));
//   }
// }

import { UdemyApiResponse } from '../types/udemy-response';

export class SerializedPaginatedUdemyCourses {
  /**
   * Total number of courses in this page
   */
  Count: number;
  /**
   * Total number of pages
   */
  NumPages: number;
  /**
   * Next page number
   */
  NextPageNum: number | null;
  /**
   * Current page number
   */
  CurrentPageNum: number;
  /**
   * Previous page number
   */
  PreviousPageNum: number | null;
  /**
   * Number of courses per page (not necessarily the number of courses in this page)
   */
  LimitPerPage: number;
  /**
   * List of courses in this page
   */
  Results: SerializedUdemyCourse[];

  constructor(udemyResponse: UdemyApiResponse) {
    // TODO: 15% is a magic to reduce from the count till we get confirmation from udemy support

    // get from url pagination data
    const urlParams = udemyResponse?.next
      ? new URLSearchParams(udemyResponse?.next)
      : udemyResponse?.previous
        ? new URLSearchParams(udemyResponse?.previous)
        : null;

    // check whether i got the page from next or pevious
    const page = +urlParams?.get('page');
    this.CurrentPageNum = page ? (page - 1 < 1 ? page + 1 : page - 1) : 1;

    this.LimitPerPage = +urlParams?.get('page_size');

    const totalCoursesCount = +udemyResponse?.count * 0.85 || 0;

    this.Count = +udemyResponse?.results?.length || 0;

    this.NumPages = Math.floor(+totalCoursesCount / this.LimitPerPage);

    this.NextPageNum =
      this.CurrentPageNum + 1 > this.NumPages ? null : this.CurrentPageNum + 1;

    this.PreviousPageNum =
      this.CurrentPageNum - 1 < 1 ? null : this.CurrentPageNum - 1;

    this.Results = udemyResponse.results.map(
      (course) => new SerializedUdemyCourse(course),
    );
  }
}
