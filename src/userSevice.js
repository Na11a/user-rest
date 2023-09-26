class UserService {
  static url = 'https://gorest.co.in/public/v2'

  getUsers (page,gender) {
    return fetch(`${UserService.url}/users?page=${page}${gender !=='all' ? `&gender=${gender}` : ''}`, {
      headers:{
        Authorization: 'Bearer b7946bdf6f0a103d193da7aa315736f7b01021f58bb8de9b9ec56ad0b5f19706'
      }})
  }

  getUser (userId) {
    return fetch(`${UserService.url}/users/${userId}`, {
      headers:{
        Authorization: 'Bearer b7946bdf6f0a103d193da7aa315736f7b01021f58bb8de9b9ec56ad0b5f19706'
      }})
  }

  editUser(user) {
    return fetch(`${UserService.url}/users/${user.id}`, {
      body: user,
      method: 'PUT',
      headers:{
        Authorization: 'Bearer b7946bdf6f0a103d193da7aa315736f7b01021f58bb8de9b9ec56ad0b5f19706'
      }})
  }
}

export default new UserService 