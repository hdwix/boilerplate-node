import { GadgetService } from './gadget.service';
export declare class GadgetController {
    private readonly gadgetService;
    constructor(gadgetService: GadgetService);
    getExampleData(): Promise<any>;
}
