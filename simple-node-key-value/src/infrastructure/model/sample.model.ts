export class SampleModel {
  constructor(hello: SampleModel | any) {
    this.name = hello.name;
    this.age = hello.age;
    this.city = hello.city;
  }

  name: string;
  age: number;
  city: string;

  save(): SampleModel {
    return this;
  }
}
