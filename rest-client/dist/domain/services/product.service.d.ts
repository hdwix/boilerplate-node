export declare class ApiService {
    private readonly apiUrl;
    get(endpoint: string): Promise<any>;
    post(endpoint: string, data: any): Promise<any>;
}
