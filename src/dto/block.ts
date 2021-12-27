import { ITransaction } from "./transaction";

export interface IBlock {
    index: number;
    timestamp: Date;
    transactions: ITransaction[];
    nonce: number;
    hashValue: string;
    previousBlockHashValue: string;
}