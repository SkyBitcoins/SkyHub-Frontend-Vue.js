/**
 * Created by Alexandru Ionut Budisteanu - SkyHub on 6/25/2017.
 * (C) BIT TECHNOLOGIES
 */


export default{

    CRYPTO_NEW_CURRENCIES_VALUES: ({ commit }, { currenciesValues }) => {

        commit('SET_CRYPTO_CURRENCIES_VALUES', {currenciesValues});

    },

    CRYPTO_NEW_CURRENCIES_LAST_TIMESTAMP: ({ commit }, { timestamp}) => {

        commit('SET_CRYPTO_CURRENCIES_TIMESTAMP', {timestamp});

    },

}

