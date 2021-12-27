import { dev } from './config.dev'
import { prod } from './config.prod'
import { local } from './config.local'

export const Config = function(){
    if(process.env.NODE_ENV == 'dev'){
        return dev
    }
    else if(process.env.NODE_ENV == 'prod'){
        return prod
    }
    else{
        return local
    }
}