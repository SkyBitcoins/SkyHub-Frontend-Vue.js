/**
 * Created by Alexandru Ionut Budisteanu - SkyHub on 6/25/2017.
 * (C) BIT TECHNOLOGIES
 */


export default{

    SET_CRYPTO_CURRENCIES_VALUES: (state, { currenciesValues }) => {
        state.currenciesValues = currenciesValues;
    },

    SET_CRYPTO_CURRENCIES_TIMESTAMP: (state, { timestamp }) => {
        state.currenciesLastTimestamp = timestamp;
    },

}