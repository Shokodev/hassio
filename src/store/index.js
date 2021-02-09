import Vue from 'vue'
import Vuex from 'vuex'
import {
    getAuth,
    Auth,
    createConnection,
    subscribeEntities,
} from "home-assistant-js-websocket";



Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        hassUrl: "http://192.168.0.58:8123",
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
        }
    },
    actions: {
        async signIn({ commit, state }) {
            let auth;
            try {
                auth = new Auth(JSON.parse(localStorage.getItem('auth')));
                await auth.refreshAccessToken();
            } catch (err) {
                console.log(err);
                auth = await getAuth({
                    hassUrl: state.hassUrl,
                    saveTokens: (data) => {
                        localStorage.setItem('auth', JSON.stringify(data));
                    }
                });
            }
            const connection = await createConnection({ auth });
            commit('con', connection)
            subscribeEntities(connection, entities => {
                console.log(entities);
                commit('entities', entities);
            });
        }

    },
    modules: {},
    getters: {
        entities(state) {
            return state.entities
        },
    }
});