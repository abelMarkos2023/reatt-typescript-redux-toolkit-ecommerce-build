import {TProduct} from './products'

export type TOrder = {
    id:number;
    userId:number;
    subTotal:number;
    items:TProduct[]
}