import { PageEvent } from '@angular/material/paginator';
import { HttpParams } from '@angular/common/http';

export abstract class GenericFilter {

  private params: HttpParams;

  public page?: number;
  public lines?: number;
  public orderBy?: string;
  public direction?: 'ASC' | 'DESC';

  constructor() {
    this.params = new HttpParams();
  }

  public abstract buildParams(): void;

  public abstract isEmpty(): boolean;

  protected addParam(name: string, value: string): void {
    if (value) {
      this.params = this.params.append(name, value);
    }
  }

  public includePagination() {
    if (this.page) {
      this.addParam('page', this.page.toString());
    }
    if (this.lines) {
      this.addParam('lines', this.lines.toString());
    }
    if (this.orderBy) {
      this.addParam('orderBy', this.orderBy);
    }
    if (this.direction) {
      this.addParam('direction', this.direction.toUpperCase());
    }
  }

  updatePagination(event: PageEvent) {
    this.page = event.pageIndex;
    this.lines = event.pageSize;
  }

  public getParams(): HttpParams {
    this.params = new HttpParams();
    this.buildParams();
    if (
      this.page ||
      this.lines ||
      this.orderBy ||
      this.direction
    ) {
      this.includePagination();
    }
    return this.params;
  }

}
