import { ApiService } from 'src/domain/services/product.service';
import { ProductDto } from '../dto/product.dto';
export declare class ProductController {
    private readonly apiService;
    constructor(apiService: ApiService);
    getAllProducts(): Promise<any>;
    createProduct(productDto: ProductDto): Promise<any>;
}
