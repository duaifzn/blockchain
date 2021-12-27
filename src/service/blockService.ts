import { IBlock } from '../dto/block'
import { ITransaction } from '../dto/transaction'
import { Block } from '../model/block'

export default class BlockService{

    async createOneBlock(
        block: IBlock){
            return await Block.create({
                index: block.index,
                timestamp: block.timestamp,
                transactions: block.transactions,
                nonce: block.nonce,
                hashValue: block.hashValue,
                previousBlockHashValue: block.previousBlockHashValue
            })
    }
}