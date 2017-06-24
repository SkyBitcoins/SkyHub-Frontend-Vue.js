/*
        I USE VUEX SAGA for ASYNC actions
 */

import Vue from 'vue'
import Vuex from 'vuex'
import VuexSaga from 'vuex-saga';

import HackerNewsModule from './hackernews-store/Hackernews-module';
import AuthenticateModule from './authenticate-store/AuthenticatedUser-module'
import SocketStatusModule from './socket-status-store/SocketStatus-module'

Vue.use(Vuex)

export function createStore () {
    return new Vuex.Store({
        modules: {
            hackernews: HackerNewsModule,
            authenticatedUser: AuthenticateModule,
            socketStatus: SocketStatusModule,
        }
    });
}
