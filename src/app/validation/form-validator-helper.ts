import { AbstractControl } from '@angular/forms';

export class FormValidatorHelper {

  /*
  Validação para caso o array esteja vazio ou nullo
 */
  static nonEmpty(control: AbstractControl) {
    if (!control.value || control.value.length === 0) {
      return { noElements: true };
    }
    return null;
  }

  /*
  Retorna um null se a string não é vazia ou um objeto {blankString: true} caso ela seja
 */
  static blankStringValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const isBlank = control.value.trim() ? false : true;
    return isBlank ? { blankString: true } : null;
  }

  static emailPatternValidator(control: AbstractControl): {[key: string]: boolean} | null {
    const regexp = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    return regexp.test(control.value) ? null : {emailPattern: true};
  }

}
