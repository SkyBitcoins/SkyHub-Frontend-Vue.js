/**
 * Created by Alexandru Ionut Budisteanu - SkyHub on 6/25/2017.
 * (C) BIT TECHNOLOGIES
 */

import FetchService from 'services/communication/FetchService'
import CryptoWallet from 'models/Crypto/CryptoWallet.model'

export default{

    CRYPTO_NEW_CURRENCIES_VALUES: ({ commit }, { currenciesValues }) => {

        commit('SET_CRYPTO_CURRENCIES_VALUES', {currenciesValues});

    },

    CRYPTO_NEW_CURRENCIES_LAST_TIMESTAMP: ({ commit }, { timestamp}) => {

        commit('SET_CRYPTO_CURRENCIES_TIMESTAMP', {timestamp});

    },

    CRYPTO_NEW_CRYPTO_WALLET: async ({ state, commit }, { productId, cryptoCurrency }) => {

        if (typeof state.cryptoWallets[productId] !== 'undefined' ) return state.cryptoWallets[productId];

        console.log('CRYPTO_NEW_WALLETS_PAY', productId );

        let answer = await FetchService.sendRequestGetData( "crypto/add-new-wallet", { productId: productId, cryptoCurrency: cryptoCurrency } );

        console.log('CRYPTO_NEW_WALLETS_PAY answer ',answer);

        if ((typeof answer !== "undefined")&&(answer.result === true)) {

            console.log('CRYPTO_NEW_WALLETS_PAY answer1 ');

            let wallet = new CryptoWallet(answer.cryptoWallet) ;
            await commit('SET_CRYPTO_WALLET_PAY', { cryptoWalletData: wallet });

            console.log('CRYPTO_NEW_WALLETS_PAY answer2 ',wallet);

            return  {result: true, cryptoWallet: wallet }
        }
        else
            return {result:false, cryptoWallet: null }

    },

}

