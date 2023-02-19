import {MessageResultDto} from "./MessageResultDto";
import {TraderDto} from "./TraderDto";

export class GetTraderDto extends MessageResultDto {
    public traders: TraderDto[];

    constructor(message: string, traders: TraderDto[]) {
        super(message);
        this.traders = traders;
    }
}