import axios from "axios";

const KEY = "AIzaSyDSfVhefruIb6v0zCzLq4B3GU3njMbTKPc";
const searchEngineId = "b682819d891914fcd";
const URL = `https://www.googleapis.com/customsearch/v1?key=${KEY}&cx=${searchEngineId}&q=`;

// &q=${encodeURIComponent(query)}
export default URL;