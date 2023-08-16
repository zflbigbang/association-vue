export interface ApplicationInt{
    "appno": number,
    "perno": number,
    "actno": number,
    "appdata": Date,
    "appsta": number
}

export class InitData{
    list:ApplicationInt[]=[]
    isShow=false
    active:ApplicationInt={
        appno:0,
        perno:0,
        actno:0,
        appdata:new Date(),
        appsta:0
    }
}