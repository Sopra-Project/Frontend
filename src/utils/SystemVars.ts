import isDev from "./DevDetect";

export const API_URL = isDev() ? process.env.REACT_APP_API_DEV_URL : process.env.REACT_APP_API_PROD_URL;