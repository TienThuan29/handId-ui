import axios from "axios";


const REST_API_BASE = "http://localhost:8090/HandIdDetector";
const STUDENT_CHECKING_API = REST_API_BASE + "/api/students/check/"


const StudentAPI = {

    checkRoleNumber(roleNumber, access_token) {
        return axios.get(STUDENT_CHECKING_API+roleNumber,{
            headers: {
                "Authorization": `Bearer ${access_token}`,
                // "Access-Control-Allow-Origin": "*",
                // "Accept": "application/json"   
            }
        })
    }

}

export default StudentAPI;
