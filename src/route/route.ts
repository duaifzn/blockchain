import { Router } from "express";
import BlockchainNode from '../controller/blockchain'
import { ITransaction } from '../dto/transaction'
import { transactionValidator } from '../middleware/transactionValidator'
let router = Router();
const blockchainNode = new BlockchainNode();


router.get('/blockchain', (req, res) =>{
    res.json(blockchainNode)
})
router.post('/transaction', transactionValidator, async (req, res) =>{
    const { amount, sender, recipient } = req.body
    await blockchainNode.createOnePendingTransaction({amount: amount, sender: sender, recipient: recipient})
    res.json(blockchainNode)
})
router.post('/mine', async (req, res) =>{
    const unHashDataOfLatestBlock = blockchainNode.getOneUnHashDataOfLatestBlock()
    const previousHashValue = unHashDataOfLatestBlock.previousBlockHashValue
    const [nonce, hashValue] = await blockchainNode.proofOfWork(previousHashValue, unHashDataOfLatestBlock)
    await blockchainNode.createAndChainOneBlock(unHashDataOfLatestBlock, hashValue, nonce)
    res.json(blockchainNode)
})
router.post('/registerAndBroadcastNode', async (req, res) =>{
    const { nodeUrl } = req.body
    await blockchainNode.registerAndBroadcastNode(nodeUrl)
    res.json({status: 'ok'})
})
router.post('/registerNode', async (req, res) =>{
    const { nodeUrl } = req.body
    console.log('test: ', req.body)
    await blockchainNode.registerNode(nodeUrl)
    res.json({status: 'ok'})
})
export default router