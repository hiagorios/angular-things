import { Injectable } from '@angular/core';
import { STORAGE_KEYS } from 'src/config/storage-keys.config';

@Injectable({ providedIn: 'root' })
export class StorageService {

  public setAcessToken(token: string | null): void {
    if (token == null) {
      localStorage.removeItem(STORAGE_KEYS.acessToken);
    } else {
      localStorage.setItem(STORAGE_KEYS.acessToken, token);
    }
  }

  public getAcessToken(): string | null {
    const usr = localStorage.getItem(STORAGE_KEYS.acessToken);
    if (usr == null) {
      return null;
    } else {
      return usr;
    }
  }

}
