export class HelloModel {
  constructor(hello: HelloModel | any) {
    this.name = hello.name;
    this.age = hello.age;
  }

  name: string;
  age: number;

  save(): HelloModel {
    return this;
  }
}
