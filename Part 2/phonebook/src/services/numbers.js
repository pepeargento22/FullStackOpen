import axios from 'axios'

const serverUrl = 'http://localhost:3001/persons'

export const getPhonebook = () => {
    const request = axios.get(serverUrl)
      return request.then(response => { return response.data })
}

export const addPhonebook = (object) => {
  const request = axios.post(serverUrl, object)
  return request.then(response => { return response.data })
}

export const deletePhonebook = (id) => {
  const request = axios.delete(`${serverUrl}/${id}`)
  return request
}

export const changePhonebook = (id, object) => {
  const request = axios.put(`${serverUrl}/${id}`, object)
  return request.then(response => { return response.data })
}

export default { getPhonebook, addPhonebook, deletePhonebook, changePhonebook }