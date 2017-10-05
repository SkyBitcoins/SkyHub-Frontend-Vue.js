/**
 * Created by Alexandru Ionut Budisteanu - SkyHub on 6/25/2017.
 * (C) BIT TECHNOLOGIES
 */


export default{

    convertCurrency : (state => (value, initCurrency, finalCurrency)=>{

        if (typeof state.currenciesValues[initCurrency] === 'undefined') return null;
        if (typeof state.currenciesValues[initCurrency][finalCurrency] === 'undefined') return null;

        return value * state.currenciesValues[initCurrency][finalCurrency]
    }),

}