import { ITransaction } from "./transaction";

export interface IUnHashData {
    index: number;
    timestamp: Date;
    transactions: ITransaction[];
    previousBlockHashValue: string;
}