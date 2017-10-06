/**
 * Created by BIT TECHNOLOGIES on 5/28/2017.
 */

export default class CryptoWallet {


    constructor( data ) {

        this.id = data.id||'';

        this.address = data.address || '';
        this.currency = data.currency || '';
        this.productId = data.productId || '';
        this.fiatValue = data.fiatValue || '';
        this.fiatCurrency = data.fiatCurrency || '';
        this.validated = data.validated || '';
        this.authorId = data.authorId || '';

        this.dtCreation = ((typeof data.dtCreation === "string")&&(data.dtCreation !== '')) ? Date.parse(data.dtCreation) : new Date(data.dtCreation||new Date());

        //console.log('Forum Assigned', data);
    }



}
