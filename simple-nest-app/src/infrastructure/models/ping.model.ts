export class PingModel {
    data: string;
    meta: {
        code: number;
        message: string;
    };

    constructor(ping: PingModel | any) {
        this.data = 'pong'
        this.meta = { code: 200, message: 'Success' }; // Inisialisasi meta
    }

    save(): PingModel{
        return this;
    }
}
