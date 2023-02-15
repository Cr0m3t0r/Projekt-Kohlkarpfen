
export class UserDto {
    public id: string;

    public fullname: string;

    public email: string;

    public createdAt: Date;

    public cellphonenumber: number;

    public interestedProducts: string[];

    public favoredTrader: string[];

    constructor(
        id: string,
        fullname: string,
        email: string,
        Date: Date,
        cellphonenumber: number,
        interestedProducts: string[],
        favoredTrader: string[]
    ) {
        this.id = id;
        this.fullname = fullname;
        this.email = email;
        this.createdAt = Date;
        this.cellphonenumber = cellphonenumber;
        this.interestedProducts = interestedProducts;
        this.favoredTrader = favoredTrader;
    }
}






