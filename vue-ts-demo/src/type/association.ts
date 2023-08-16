export interface ListInt{
    assno:number,
    assname:string,
    asssta:string
}
interface selectDataInt{
    title:string,
    introduce:string,
    page:number,
    count:number,
    pagesize:number
}
export class InitData{

    selectData:selectDataInt={
        title:"",
        introduce:"",
        page:1,
        count:0,
        pagesize:10
    }
    list:ListInt[]=[]
}