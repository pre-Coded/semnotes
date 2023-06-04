import axios from 'axios';

const KEY = "AIzaSyAgo6j1RcOVT9Fuokpvg9da674bAga90dk";

export default axios.create({
    baseURL : 'https://www.googleapis.com/youtube/v3/',
    params : {
        part : 'snippet',
        maxResult : 16,
        key : KEY,
    }
})