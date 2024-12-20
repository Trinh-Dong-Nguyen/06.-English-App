export class PaginatedResponse {
  public readonly data: Array<Record<string, any>>;
  public readonly currentPage: number;
  public readonly totalPages: number;
  public readonly totalCount: number;
  public readonly pageSize: number;
  public readonly hasPreviousPage: boolean;
  public readonly hasNextPage: boolean;
  constructor(
    data: Array<Record<string, any>>,
    currentPage: number,
    totalCount: number,
    pageSize: number,
  ) {
    this.data = data;
    this.totalCount = totalCount;
    this.currentPage = currentPage;
    this.pageSize = pageSize;
    this.totalPages = Math.ceil(totalCount / pageSize);
    this.hasPreviousPage = currentPage > 1;
    this.hasNextPage = currentPage < this.totalPages;
  }
  public static create(
    data: Array<Record<string, any>>,
    currentPage: number,
    totalCount: number,
    pageSize: number,
  ) {
    return new PaginatedResponse(data, currentPage, totalCount, pageSize);
  }
}

export class PaginatedResult {
  public readonly message: string;
  public readonly result: PaginatedResponse;
  private constructor(message: string = '', result: PaginatedResponse) {
    this.message = message;
    this.result = result;
  }
  public static create(message: string, result: PaginatedResponse) {
    return new PaginatedResult(message, result);
  }
}
