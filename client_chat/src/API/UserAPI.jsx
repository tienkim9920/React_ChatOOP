import axiosClient from "./axiosClient"

const UserAPI = {

    getAll: () => {
        const url = '/users'
        return axiosClient.get(url)
    },

} 

export default UserAPI