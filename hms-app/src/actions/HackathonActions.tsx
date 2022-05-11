const core_url = process.env.REACT_APP_CORE_URL
const controller = new AbortController()
const { signal } = controller

export const getListOfHackathons = () => {
  return fetch(`${core_url}/hackathons`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then((data) => {
      return data.json()
    })
    .catch((err) => console.log(err))
}

export const getHackathonDetails = (hackathonID: string) => {
  return fetch(`${core_url}/hackathon/${hackathonID}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then((data) => {
      return data.json()
    })
    .catch((err) => console.log(err))
}

export const cancelRequest = () => {
  console.log('abort pressed')
  return controller.abort()
}

export const getNewHackathonDetails = (hackathonID: string) => {
  return fetch(`${core_url}/hackathon/${hackathonID}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    signal,
  })
    .then((data) => {
      return data.json()
    })
    .catch((err) => console.log(err))
}

export const createHackathon = (
  title: string,
  startDate: Date,
  endDate: Date
) => {
  return fetch(`${core_url}/hackathon`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: title,
      startDate: startDate.toString(),
      endDate: endDate.toString(),
    }),
  })
    .then((response) => {
      return response.json()
    })
    .catch((err) => console.log(err))
}

export const editHackathon = (
  hackathonID: string,
  title: string,
  startDate: Date,
  endDate: Date
) => {
  return fetch(`${core_url}/hackathon/${hackathonID}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: title,
      startDate: startDate.toString(),
      endDate: endDate.toString(),
    }),
  })
    .then((response) => {
      return response.json()
    })
    .catch((err) => console.log(err))
}

export const deleteHackathon = (hackathonID: string) => {
  return fetch(`${core_url}/hackathon/${hackathonID}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      return response.json()
    })
    .catch((err) => console.log(err))
}
