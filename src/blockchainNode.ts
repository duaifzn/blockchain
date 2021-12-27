import express from "express"
import mongoose from "mongoose"
import Blockchain from "./controller/blockchain"
import router from "./route/route"
import cors from 'cors'
import { Config } from "./config/config"
const config = Config()

export default class BlockchainNode extends Blockchain{
    app: express.Application
    port: number
    constructor(){
        super()
        this.app = express()
        this.port = Number(process.env.PORT) || 3000
        this.serverInit()
        this.serverRun()
        this.connectMongo()
    }
    async serverInit(){
        this.app.use(cors())
        this.app.use(express.json())
        this.app.use(express.urlencoded({extended: false}))
        this.app.use('/api', router)
    }
    async connectMongo(){
        try{
            await mongoose.connect(
                config.mongoDb.uri,{
                authSource: config.mongoDb.authSource,
                user: config.mongoDb.user,
                pass: config.mongoDb.pass
            })
            console.log('mongoDB connected!')
        }catch(err){
            console.log(err)
            console.log('mongoDB connect failed! ')
        }
    }
    serverRun(){
        this.app.listen(this.port, () =>{
            console.log(`server running on port ${this.port}.`)
        })
    }
};


const blockchainNode = new BlockchainNode();
// (async() =>{
//     const blockchainNode = new BlockchainNode();
//     console.log(blockchainNode.chain)
//     // let aa = {
//     //     index: 1,
//     //     timestamp: new Date(),
//     //     transactions: [
//     //       {
//     //         amount: 1111,
//     //         sender: 'sss',
//     //         recipient: 'dddd',
//     //       }
//     //     ],
//     //     nonce: 2223,
//     //     hashValue: 'asdadadewwd',
//     //     previousBlockHashValue: 'asdadasdas',
//     // }
//     // let hash = 'AE79E26847F285C1CAD91B265491A4C3EF5F9C57CE00CCFBEB94D74E73C3ED5E'
//     // let nonce = await blockNode.proofOfWork(hash, aa)
//     // console.log(nonce)
//     // console.log(blockNode.hashBlock(hash, aa, nonce))
// })()
