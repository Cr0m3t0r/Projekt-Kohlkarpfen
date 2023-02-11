
export class AdminDto {
    public id: string;

    public username: string;

    public role: string;

    public Date: Date;

    constructor(id: string, username: string, role: string, Date: Date) {
        this.id = id;
        this.username = username;
        this.role = role;
        this.Date = Date;

    }
}
