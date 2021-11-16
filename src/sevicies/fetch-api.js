const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '23620091-2d5d28040986b37b269a969d4';

export default function fetchImage(query) {
    return fetch(`${BASE_URL}?q=${query}&page=1&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`).then(response => {
        if (response.ok) {
            return response.json()
        }
        return Promise.reject(`No images with query ${query} found`)
    })
}