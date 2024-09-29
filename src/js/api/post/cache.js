export default function cacheDataWithExpiry(data, storage, seconds = 30) {
  const milliseconds = seconds * 1000
  const time = new Date()
  const dataWithExpiration = {
    ...data,
    expiry: time.getTime() + milliseconds,
  }
  localStorage[storage] = JSON.stringify(dataWithExpiration)
}
