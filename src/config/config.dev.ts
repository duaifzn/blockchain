import { IUnHashData } from '../dto/unHashData'
export const dev:{
    mongoDb: {
        uri: string,
        authSource: string,
        user: string,
        pass: string
    },
    genesisBlockValue: {
        unHashData: IUnHashData,
        hashValue: string,
        nonce: number
    },
    nodeUrl: string,
    nodesUrls: string[]
} = {
    mongoDb:{
        uri: 'mongodb://mongo-blockchain:27017/blockchain',
        authSource: 'admin',
        user: 'root',
        pass: 'root'
    },
    genesisBlockValue: {
        unHashData:{
            index: 1,
            timestamp: new Date(),
            transactions: [],
            previousBlockHashValue: 'asd',
        },
        hashValue: 'asd',
        nonce: 1
    },
    nodeUrl: process.env.nodeUrl,
    nodesUrls: JSON.parse(process.env.nodesUrls)
}