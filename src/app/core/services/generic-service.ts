import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Entity } from 'src/app/shared/models/entity';
import { Page } from 'src/app/shared/models/page';
import { environment } from 'src/environments/environment';

export abstract class GenericService<T extends Entity> {

  constructor(public http: HttpClient, public endpoint: string) { }

  findById(id: number): Observable<T> {
    return this.http.get<T>(
      `${environment.baseURL}/${this.endpoint}/${id}`
    );
  }

  findPerPage(
    page?: number,
    lines?: number,
    orderBy?: string,
    direction?: string
  ): Observable<Page<T>> {
    let params = new HttpParams();
    if (page) {
      params = params.append('page', page.toString());
    }
    if (lines) {
      params = params.append('lines', lines.toString());
    }
    if (orderBy) {
      params = params.append('orderBy', orderBy);
    }
    if (direction) {
      params = params.append('direction', direction.toUpperCase());
    }
    return this.http.get<Page<T>>(
      `${environment.baseURL}/${this.endpoint}/page`,
      { params }
    );
  }

  create(entity: T) {
    return this.http.post(
      `${environment.baseURL}/${this.endpoint}`,
      entity,
      {
        observe: 'response',
        responseType: 'text'
      }
    );
  }

  update(entity: T) {
    return this.http.put(
      `${environment.baseURL}/${this.endpoint}/${entity.id}`,
      entity,
      {
        observe: 'response',
        responseType: 'text'
      }
    );
  }

  delete(entity: T) {
    return this.http.delete(
      `${environment.baseURL}/${this.endpoint}/${entity.id}`
    );
  }
}
