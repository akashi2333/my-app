import store from 'store'
const USER_KEY = 'user_key'
// eslint-disable-next-line import/no-anonymous-default-export
export default {
    saveUser (user) {
        store.set(USER_KEY,user)
    },
    getUser () {
        return store.get(USER_KEY) || {}
    },
    removeUser () {
        store.remove(USER_KEY)
    }
}