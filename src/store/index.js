import Vue from 'vue'
import Vuex from 'vuex'
import {
    getAuth,
    Auth,
    createConnection,
    subscribeEntities,
} from "home-assistant-js-websocket";
import router from '@/router/index'


Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        hassUrl: "https://homeassistant.andreas-vogt.ch/",
        entities: [],
        connection: null,
    },
    mutations: {
        entities(state, data) {
            state.entities = [];
            Object.keys(data).forEach(item => {
                state.entities.push(data[item]);
            });
        },
        con(state, data) {
            state.connection = data;
        },
    },
    actions: {
        async signIn({ commit, state }) {
            let auth = JSON.parse(localStorage.getItem('auth'));
            if (auth) {
                auth = new Auth(auth);
                await auth.refreshAccessToken();
                localStorage.setItem('auth', JSON.stringify(auth.data));
                location.search = '';
                await router.replace('/home');
            } else {
                auth = await getAuth({
                    hassUrl: state.hassUrl,
                    saveTokens: (data) => {
                        localStorage.setItem('auth', JSON.stringify(data));
                    }
                });
                location.search = '';
                await router.replace('/home');
            }
            const connection = await createConnection({ auth });
            commit('con', connection);
            subscribeEntities(connection, entities => {
                commit('entities', entities);
                console.log(entities);
            });
        },
        async signOut({ state }) {
            localStorage.removeItem('auth');
            state.connection.close();
            state.connection = null
            window.location.replace('/');
        }

    },
    modules: {},
    getters: {
        entities(state) {
            return state.entities
        },
    }
});