import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Entidade } from 'src/app/shared/models/Entidade';
import { Page } from 'src/app/shared/models/Page';
import { environment } from 'src/environments/environment';

export abstract class GenericService<T extends Entidade> {

  constructor(public http: HttpClient, public endpoint: string) {}

  findById(id: number): Observable<T> {
    return this.http.get<T>(
      `${environment.springboot.baseUrl}/${this.endpoint}/${id}`
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
      `${environment.springboot.baseUrl}/${this.endpoint}/page`,
      { params }
    );
  }

  cadastrar(entidade: T) {
    return this.http.post(
      `${environment.springboot.baseUrl}/${this.endpoint}`,
      entidade,
      {
        observe: 'response',
        responseType: 'text'
      }
    );
  }

  editar(entidade: T) {
    return this.http.put(
      `${environment.springboot.baseUrl}/${this.endpoint}/${entidade.id}`,
      entidade,
      {
        observe: 'response',
        responseType: 'text'
      }
    );
  }

  remover(entidade: T) {
    return this.http.delete(
      `${environment.springboot.baseUrl}/${this.endpoint}/${entidade.id}`
    );
  }
}
