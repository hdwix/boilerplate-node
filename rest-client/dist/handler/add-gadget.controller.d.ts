import { GadgetService } from '../modules/gadget/gadget.service';
export declare class GadgetController {
    private readonly gadgetService;
    constructor(gadgetService: GadgetService);
    createObject(body: any): Promise<any>;
}
