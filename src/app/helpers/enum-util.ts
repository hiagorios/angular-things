import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnumUtil {

  getKey(enumType: object, value: string): string {
    let key;
    Object.values(enumType).filter((v, i) => {
      if (v === value) {
        key = Object.keys(enumType)[i];
        return;
      }
    });
    return key;
  }

  getEnumMember(enumType: object, key: string) {
    return enumType[key];
  }

  getAllKeys(enumType: object) {
    return Object.keys(enumType);
  }

  getAllValues(enumType: object) {
    return Object.values(enumType);
  }

  getPairs(enumType: object) {
    let pairs = [];
    this.getAllKeys(enumType).forEach(key => {
      pairs.push({
        key,
        value: enumType[key]
      });
    });
    return pairs;
  }
}
