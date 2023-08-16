export interface ListInt{
    manno:number,
    assno:number,
    manname:string,
    manpho:string,
    mansup:number
}
interface selectDataInt{
    title:string,
    mansup:number,
}

export class InitData{

    selectData:selectDataInt={
        title:"",
        mansup: 2
    }
    list:ListInt[]=[]
    isShow=false
    active:ListInt={
        manno:0,
        assno:0,
        manname:"",
        manpho:"",
        mansup:0
    }
}