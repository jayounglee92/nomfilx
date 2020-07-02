import axios from 'axios';

const api = axios.create({
    baseURL: "https://api.themoviedb.org/3/"
});

api.interceptors.request.use(config => {
    config.params = config.params || {};
    config.params['api_key'] = "79588a038f3a91810241f5cb17b24d0e";
    //config.params['language'] = "en-US";
    config.params['language'] = "ko-KR";
    return config;
})

export const moviesApi = {
    nowPlaying: () => api.get("movie/now_playing"),
    upcoming: () => api.get("movie/upcoming"),
    popular: () => api.get("movie/popular"),
    movieDetail: id => api.get(`movie/${id}`, {
      params: {
        append_to_response: "videos"
      }
    }),
    search: term => api.get("search/movie", {
        params: {
            query: encodeURIComponent(term)
        }
    })
}

export const tvApi = {
    topRated: () => api.get("tv/top_rated"),
    popular: () => api.get("tv/popular"),
    airingToday: () => api.get("tv/airing_today"),
    showDetail: id => api.get(`tv/${id}`, {
      params: {
        append_to_response: "videos"
      }
    }),
    search: term => api.get("search/tv", {
        params: {
            query: encodeURIComponent(term)
        }
    })
}

export const collectionApi = {
  collection: id => api.get(`collection/${id}`)
}

export default api;