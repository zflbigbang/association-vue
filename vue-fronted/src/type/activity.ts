export interface ActiveInt{
    "actno": number,
    "assno": number,
    "actname": string,
    "actdata": Date,
    "actsta": string
}
export interface ApplicationInt{
    "appno": number,
    "perno": number,
    "actno": number,
    "appdata": Date,
    "appsta": number
}

export class InitData{
    list:ActiveInt[]=[]
    isShow=false
    active:ApplicationInt={
        appno:0,
        perno:0,
        actno:0,
        appdata:new Date(),
        appsta:0
    }
}