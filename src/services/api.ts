import { API_ACCESS_TOKEN } from '@env'


export const fetchLocalMapBox = (local: string) =>
    fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${local}.json?${API_ACCESS_TOKEN}`
    )
        .then((response) => response.json())
        .then((data) => data)

export const fetchUserGithub = (login: string) =>
    fetch(`https://api.github.com/users/${login}`)
        .then((response) => response.json())
        .then((data) => data)