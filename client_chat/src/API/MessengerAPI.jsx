
import axiosClient from './axiosClient'

const MessengerAPI = {

    getAllMessage: (query) => {
        const url = `/messenger${query}`
        return axiosClient.get(url)
    },

    postMessage: (query) => {
        const url = `/messenger/send${query}`
        return axiosClient.post(url)
    }
}

export default MessengerAPI