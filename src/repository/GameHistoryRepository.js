import Repository from '@/repository/Repository'

const resource = 'game-history'
const socket = 'chess-socket'

export default {
    createGame(data) {
        return Repository.post(`${resource}`, data)
    },
    updateGame(data) {
        return Repository.put(`${resource}`, data)
    },
}