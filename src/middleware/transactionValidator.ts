import { check, body, validationResult } from 'express-validator'
import { Request, Response, NextFunction } from 'express'

export async function transactionValidator(req: Request, res: Response, next: NextFunction){
    await body('amount').notEmpty().isInt().run(req)
    await body('sender').notEmpty().isString().run(req)
    await body('recipient').notEmpty().isString().run(req)
    const result = validationResult(req)
    if(!result.isEmpty()){
        res.json(result)
    }
    else{
        next()
    }
}