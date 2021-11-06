import axios from 'axios'
const baseUrl = 'http://localhost:3001/notes'

const getAll = () => {
    /*Returns response.data*/
    /* return axios.get(baseUrl) */
    const request = axios.get(baseUrl)
    const nonExisting = {
        id : 1000,
        content: 'Blah blah blah',
        data: '2019-05-30T17:30:31.098Z',
        important: true
    }
    return request.then(response => response.data.concat(nonExisting))
}

const create = (newObject) => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}


const exportedObjects = {
    getAll,
    create,
    update
}
export default exportedObjects

/*This doesn't work. FSO has it wrong. Leaving it here for future reference
export default {
    getAll : getAll,
    create : create,
    update : update
}*/