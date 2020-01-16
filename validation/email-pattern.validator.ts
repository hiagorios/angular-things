import { AbstractControl } from '@angular/forms';

/*
  Retorna um null se a string respeita o padrao descrito ou um objeto {emailPattern: true} caso ela seja
 */
export function emailPatternValidator(control: AbstractControl): {[key: string]: boolean} | null {
    const regexp = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    return regexp.test(control.value) ? null : {emailPattern: true};
  }
