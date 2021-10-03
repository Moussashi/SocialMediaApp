import { createStore } from 'vuex'
import posts from './posts/posts.js'


const store = createStore({
    modules: {
        posts: posts,
    }
})

export default store;