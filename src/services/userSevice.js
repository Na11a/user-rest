class UserService {
  static url = process.env.apiUrl

  getUsers (page,gender,limit) {
    return fetch(`${UserService.url}/users?page=${page}&per_page=${limit}${gender !=='all' ? `&gender=${gender}` : ''}`, {
      headers:{
        Authorization: `Bearer ${process.env.apiToken}`
      }})
  }

  getUser (userId) {
    return fetch(`${UserService.url}/users/${userId}`, {
      headers:{
        Authorization: `Bearer ${process.env.apiToken}`
      }})
  }

  editUser(user) {
    return fetch(`${UserService.url}/users/${user.id}`, {
      body: user,
      method: 'PUT',
      headers:{
        Authorization: `Bearer ${process.env.apiToken}`
      }})
  }
}

export default new UserService 