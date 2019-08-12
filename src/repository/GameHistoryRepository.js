import Repository from '@/repository/Repository'

const resource = 'game-history'

export default {
    createGame(data) {
        return Repository.post(`${resource}/create`, data)
    },
    updateGame(data) {
        return Repository.put(`${resource}/update`, data)
    }
}