import { AbstractControl } from '@angular/forms';

/*
  Retorna um null se a string não é vazia ou um objeto {blankString: true} caso ela seja
 */
export function blankStringValidator(control: AbstractControl): {[key: string]: boolean} | null {
    const isBlank = control.value.trim() ? false : true;
    return isBlank ? {blankString: true} : null;
  }
