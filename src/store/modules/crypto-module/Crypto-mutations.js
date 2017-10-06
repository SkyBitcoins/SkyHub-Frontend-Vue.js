/**
 * Created by Alexandru Ionut Budisteanu - SkyHub on 6/25/2017.
 * (C) BIT TECHNOLOGIES
 */

import Vue from 'vue'
import CryptoWallet from 'models/Crypto/CryptoWallet.model'

export default{

    SET_CRYPTO_CURRENCIES_VALUES: (state, { currenciesValues }) => {
        state.currenciesValues = currenciesValues;
    },

    SET_CRYPTO_CURRENCIES_TIMESTAMP: (state, { timestamp }) => {
        state.currenciesLastTimestamp = timestamp;
    },

    SET_CRYPTO_WALLET_PAY: (state, { cryptoWalletData }) => {

        let cryptoWallet = new CryptoWallet(cryptoWalletData) ;

        Vue.set(state.cryptoWallets, cryptoWallet.id, cryptoWallet);

        return cryptoWallet;
    },

}