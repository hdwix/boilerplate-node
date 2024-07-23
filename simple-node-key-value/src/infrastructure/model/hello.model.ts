export class HelloModel {
  constructor(hello: HelloModel | any) {
    this.name = hello.name;
    this.age = hello.age;
    this.city = hello.city;
  }

  name: string;
  age: number;
  city: string;

  save(): HelloModel {
    return this;
  }
}
