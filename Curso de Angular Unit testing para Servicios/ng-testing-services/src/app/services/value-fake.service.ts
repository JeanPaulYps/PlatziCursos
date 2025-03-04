
export class FakeValueService {
  constructor() { }

  getValue () {
    return 'fake value';
  }

  setValue(value: string) {}

  getPromisedValue() {
    return Promise.resolve('fake promise value');
  }


}
