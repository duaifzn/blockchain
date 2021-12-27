import { IBlock } from '../dto/block'
import { IUnHashData } from '../dto/unHashData'
import { ITransaction } from '../dto/transaction'
import BlockService from '../service/blockService'
import sha256 from 'crypto-js/sha256'
import axios ,{ AxiosRequestConfig }from 'axios'
import { Config } from '../config/config'
const config = Config()

export default class Blockchain extends BlockService{
    chain: IBlock[]
    pendingTransactions: ITransaction[]
    nodeUrl: string
    nodesUrls: string[]
    constructor(){
        super()
        this.chain = []
        this.pendingTransactions = []
        this.nodeUrl = config.nodeUrl
        this.nodesUrls = config.nodesUrls
        this.createAndChainOneBlock(config.genesisBlockValue.unHashData, config.genesisBlockValue.hashValue, config.genesisBlockValue.nonce)
    }
    async createAndChainOneBlock(
        unHashData: IUnHashData,
        hashValue: string,
        nonce: number){
        let newBlock: IBlock = {
            index: unHashData.index,
            timestamp: unHashData.timestamp,
            transactions: unHashData.transactions,
            nonce: nonce,
            hashValue: hashValue,
            previousBlockHashValue: unHashData.previousBlockHashValue
        }
        await super.createOneBlock(newBlock)
        this.chainOneBlock(newBlock)       
        return newBlock
    }
    chainOneBlock(newBlock: IBlock){
        this.chain.push(newBlock)
    }
    getLastBlockValue(){
        return this.chain[this.chain.length-1]
    }
    getOneUnHashDataOfLatestBlock(): IUnHashData{
        const lastBlockHashValue = this.getLastBlockValue().hashValue
        const unHashData: IUnHashData = {
            index: this.chain.length+1,
            timestamp: new Date(),
            transactions: this.pendingTransactions,
            previousBlockHashValue: lastBlockHashValue
        }
        this.pendingTransactions = [] 
        return unHashData
    }
    hashBlock(
        previousBlockHashValue: string,
        unHashDataOfLatestBlock: IUnHashData,
        nonce: number){
        let hashValue = sha256(previousBlockHashValue + JSON.stringify(unHashDataOfLatestBlock) + nonce.toString())
        return hashValue.toString()
    }
    async proofOfWork(
        previousBlockHashValue: string,
        unHashDataOfLatestBlock: IUnHashData,): Promise<[number, string]>{
        let nonce = 0
        let hashValue = this.hashBlock(previousBlockHashValue, unHashDataOfLatestBlock, nonce)
        while(hashValue.substring(0,4) !== '0000'){
            nonce++
            hashValue = this.hashBlock(previousBlockHashValue, unHashDataOfLatestBlock, nonce)
        }
        return [nonce, hashValue]
    }
    async createOnePendingTransaction(transaction: ITransaction){
        this.pendingTransactions.push(transaction)
        return this.pendingTransactions
    }
    async registerAndBroadcastNode(nodeUrl: string){
        if(!this.nodesUrls.includes(nodeUrl)){
            this.nodesUrls.push(nodeUrl)
        }
        console.log(this.nodesUrls)
        for await(const nodesUrl of this.nodesUrls){
            const data = {
                nodeUrl: nodeUrl
            }
            const config: AxiosRequestConfig = {
                url: `${nodesUrl}/api/registerNode`,
                method: 'POST',
                data: data
            }
            try{
                await axios(config)
            }catch(err){
                console.log(err)
            }

        }
        return
    }
    async registerNode(nodeUrl: string){
        if(!this.nodesUrls.includes(nodeUrl)){
            this.nodesUrls.push(nodeUrl)
        }
    }
}