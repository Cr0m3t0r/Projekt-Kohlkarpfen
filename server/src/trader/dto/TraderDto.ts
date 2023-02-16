export class TraderDto {
    public id: string;
    public fullname: string;
    public email: string;
    public tradernumber: number;
    public cellphonenumber: number;
    public products: string;
    public createdAt: Date;

    constructor(
        id: string,
        fullname: string,
        email: string,
        tradernumber: number,
        cellphonenumber: number,
        products: string,
        createdAt: Date,
    ) {
        this.id = id;
        this.fullname = fullname;
        this.email = email;
        this.tradernumber = tradernumber;
        this.cellphonenumber = cellphonenumber;
        this.products = products;
        this.createdAt = createdAt;
    }
}