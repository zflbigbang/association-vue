export interface ActiveInt{
    "actno": number,
    "assno": number,
    "actname": string,
    "actdata": Date,
    "actsta": string
}

export class InitData{
    list:ActiveInt[]=[]
    isShow=false
    active:ActiveInt={
        actno:0,
        assno:0,
        actname:"",
        actdata:new Date(),
        actsta:""
    }
}