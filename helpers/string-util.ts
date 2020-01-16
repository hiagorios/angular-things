import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StringUtil {

  truncarString(str: string, maximo: number, dots?: boolean): string {
    if (str && str.length > maximo) {
      return str.substring(0, maximo) + (dots ? '...' : '');
    }
    return str;
  }
}
