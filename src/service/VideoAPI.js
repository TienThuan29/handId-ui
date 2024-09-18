import axios from "axios";

const REST_API_BASE = "http://localhost:8090/HandIdDetector";
const EXTRACT_VIDEO_API = REST_API_BASE + "/api/video/process"

const VideoAPI = {

    sendRequestToExtract(filename, access_token) {
        return axios.post(EXTRACT_VIDEO_API, null, {
            headers: {
                "Authorization": `Bearer ${access_token}`
            },
            params: {
                filename
            }
        });
    }

}

export default VideoAPI;