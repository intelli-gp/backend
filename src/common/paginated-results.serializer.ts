import { PaginationDto } from 'src/common/dto';

// Generic interface for entity results

/**
 * @template Entity The entity type e.g. UdemyCourse
 * @template SerializedEntity The serialized entity type e.g. SerializedUdemyCourse
 */
export class SerializedPaginated<Entity, SerializedEntity> {
  /**
   * Total number of entities
   */
  TotalEntityCount: number;
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
   * Number of entities per page (not necessarily the number of entities in this page)
   */
  LimitPerPage: number;
  /**
   * List of entities in this page
   */
  Results: SerializedEntity[]; // Use the generic interface

  /**
   *
   * @param data The entity data array e.g. UdemyCourse[]
   * @param totalEntityCount The total count of the entities not the one returned in this cycle data pagination
   * @param paginationData The pagination data e.g. { limit: 10, offset: 1 }
   * @param entitySerializerConstructor The entity serializer constructor e.g. SerializedUdemyCourse
   */
  constructor(
    data: Entity[],
    totalEntityCount: number,
    paginationData: PaginationDto,
    entitySerializerConstructor: new (entity: Entity) => SerializedEntity,
  ) {
    this.TotalEntityCount = totalEntityCount;

    this.NumPages = Math.ceil((totalEntityCount || 0) / +paginationData?.limit);

    console.log('limit', +paginationData?.limit);
    console.log('totalEntityCount', totalEntityCount);
    console.log('NumPages', this.NumPages);

    this.CurrentPageNum = +paginationData?.offset / +paginationData?.limit || 1;

    this.NextPageNum =
      this.CurrentPageNum + 1 > this.NumPages ? null : this.CurrentPageNum + 1;

    this.PreviousPageNum =
      this.CurrentPageNum - 1 < 1 ? null : this.CurrentPageNum - 1;
    this.LimitPerPage = paginationData?.limit;

    // Adapt this based on your specific entity serializer logic
    this.Results = data?.map(
      (entity) => new entitySerializerConstructor(entity),
    ); // Example using UdemyCourse serializer
  }
}
