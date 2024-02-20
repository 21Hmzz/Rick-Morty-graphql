import './assets/main.css'

import {createApp, h, provide} from 'vue'
import App from './App.vue'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { ApolloClient, InMemoryCache } from '@apollo/client/core'
const cache = new InMemoryCache()

const apolloClient = new ApolloClient({
    uri: 'https://rickandmortyapi.com/graphql',
    cache,
})

const app = createApp({
    setup() {
        provide(DefaultApolloClient, apolloClient)
    },
    render: () => h(App),
});

app.mount('#app')

