import { Injectable } from '@angular/core';

class StoredItem {
  constructor(public key: string, public data: any) {}
}

@Injectable()
export class StorageService {
  private readonly localStorageAcceptedKey = 'box-local-storage-accepted';
  private storage: Storage = sessionStorage;
  private sessionItems: StoredItem[] = [];

  constructor() {
    this.setStorage();
  }

  public get(key: string): string {
    return this.storage.getItem(key);
  }

  public set(key: string, data: string): void {
    this.storage.setItem(key, data);

    if (this.storage === sessionStorage) {
      this.sessionItems.push(new StoredItem(key, data));
    }
  }

  public getObject<T extends object>(key: string): T {
    return JSON.parse(this.storage.getItem(key)) as T;
  }

  public setObject(key: string, data: object): void {
    this.storage.setItem(key, JSON.stringify(data));

    if (this.storage === sessionStorage) {
      this.sessionItems.push(new StoredItem(key, data));
    }
  }

  public remove(key: string): void {
    localStorage.removeItem(key);
    sessionStorage.removeItem(key);
  }

  public isLocalStorageAccepted(): boolean {
    return localStorage.getItem(this.localStorageAcceptedKey) != null;
  }

  public setLocalStorageAccepted(accepted: boolean): void {
    if (accepted) {
      this.storage = localStorage;
      sessionStorage.clear();
      localStorage.setItem(this.localStorageAcceptedKey, 'true');

      this.sessionItems.forEach(item => {
        if (typeof item.data === 'string') {
          this.set(item.key, item.data);
        } else {
          this.setObject(item.key, item.data);
        }
      });
    } else {
      this.storage = sessionStorage;
      localStorage.clear();
    }
  }

  private setStorage() {
    this.storage = this.isLocalStorageAccepted() ? localStorage : sessionStorage;
    if (this.storage === sessionStorage) {
      localStorage.clear();
    }
  }
}
