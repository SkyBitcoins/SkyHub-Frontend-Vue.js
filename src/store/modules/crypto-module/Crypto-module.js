/**
 * Created by Alexandru Ionut Budisteanu - SkyHub on 6/25/2017.
 * (C) BIT TECHNOLOGIES
 */

import Vuex from 'vuex'

import actions from './Crypto-actions'
import mutations from './Crypto-mutations'
import getters from './Crypto-getters'

export default {
    state:  {

        currenciesValues : [],
        currenciesLastTimestamp : 0,

    },
    actions,
    mutations,
    getters
}
