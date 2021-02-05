import Vue from 'vue'
import Vuex from 'vuex'
import {
    getAuth,
    getUser,
    createConnection,
    subscribeEntities,
} from "home-assistant-js-websocket";



Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        entities: [],
    },
    mutations: {
        entities(state, data) {
            state.entities = [];
            Object.keys(data).forEach(item => {
                state.entities.push(data[item]);
            });
        },
    },
    actions: {
        async signIn({ commit }) {
            let auth;

            try {
                auth = await getAuth({
                    loadTokens: () => {
                        return JSON.parse(localStorage.getItem('auth'))
                    }
                });
            } catch (err) {
                console.log(err);
                auth = await getAuth({
                    hassUrl: "http://192.168.0.58:8123",
                    saveTokens: (data) => {
                        localStorage.setItem('auth', JSON.stringify(data));
                    }
                });
            }
            const connection = await createConnection({ auth });
            subscribeEntities(connection, entities => {
                console.log(entities);
                commit('entities', entities);
            });
            getUser(connection).then(user => {
                console.log("Logged in as", user);
                window.user = user;
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