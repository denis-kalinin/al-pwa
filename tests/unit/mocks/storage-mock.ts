class StorageMock implements Storage {
  [name: string]: any;

  length: number = 0;

  storage: any = {};

  clear(): void {
    const a = this;
    throw new Error('Method not implemented.');
  }

  getItem(key: string): string | null {
    console.debug('MOCK get', key, this[key]);
    return this[key];
  }

  key(index: number): string | null {
    const a = this;
    throw new Error('Method not implemented.');
  }

  removeItem(key: string): void {
    delete this[key];
  }

  setItem(key: string, value: string): void {
    console.debug('MOCK set', key, value);
    this[key] = value;
  }
}

globalThis.sessionStorage = new StorageMock();
