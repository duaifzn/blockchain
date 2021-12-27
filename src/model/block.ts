import { Schema, model } from 'mongoose'
import { IBlock } from '../dto/block'

const blockSchema = new Schema<IBlock>({
    index: {
        type: Number, required: true
    },
    timestamp: {
        type: Date, required: true
    },
    transactions: [{
        amount: {
            type: Number, require: true
        },
        sender: {
            type: String, require: true
        },
        recipient: {
            type: String, require: true
        },
    }],
    nonce: {
        type: Number, required: true
    },
    hashValue: {
        type: String, required: true
    },
    previousBlockHashValue: {
        type: String, required: true
    },
},{
    collection: 'Block'
})

export const Block = model<IBlock>('Block', blockSchema)