export default {
    namespaced: true,
    state() {
        return {
            posts: []
        }
    },
    mutations: {
        getPosts(state, results) {
            state.posts = results
        }
    },
    actions: {
        getPosts(context) {
            fetch('http://localhost:3000/groupomania/posts').then((response) => {
                if (response.ok) {
                    return response.json()
                }
            }).then((data) => {
                const results = [];
                for (const id in data) {
                    results.push({
                        id: id, 
                        id_user: data[id].id_user, 
                        title: data[id].title,
                        img: data[id].img})
                }
                
                console.log(results);
                context.commit('getPosts', results)
                console.log(context);
            })
        }
    },
    getters: {
        posts(state, actions) {
            actions.dispatch('getPosts')
            return state.posts
        }
    }
}