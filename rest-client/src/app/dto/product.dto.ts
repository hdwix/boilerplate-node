export class ProductDto {
  readonly name: string;
  readonly data: {
    readonly year: number;
    readonly price: number;
    readonly CPU_model: string;
    readonly Hard_disk_size: string;
  };
}

// {
//    "name": "Apple MacBook Pro 16",
//    "data": {
//       "year": 2019,
//       "price": 1849.99,
//       "CPU model": "Intel Core i9",
//       "Hard disk size": "1 TB"
//    }
// }
