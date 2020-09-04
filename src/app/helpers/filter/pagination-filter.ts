import { GenericFilter } from './generic-filter';
export class PaginationFilter extends GenericFilter {

  constructor(page?: number, lines?: number) {
    super();
    this.page = page;
    this.lines = lines;
  }

  public buildParams(): void {

  }
  public isEmpty(): boolean {
    return !this.page && !this.lines && !this.orderBy && !this.direction;
  }
}
