import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN_KEY, LOGIN_PAGE, REFRESH_TOKEN_KEY } from "../config/Constant";
import AuthenticationAPI from "../service/AuthenticationAPI";
import { useEffect, useState } from "react";

export default function HomePage() {

    const navigator = useNavigate();
    const [user, setUser] = useState({
        username: '',
        fullname: ''
    });
    const access_token = localStorage.getItem(ACCESS_TOKEN_KEY);
    const refresh_token= localStorage.getItem(REFRESH_TOKEN_KEY);

    useEffect(() => {

    console.log(access_token);
    if (access_token) {

        AuthenticationAPI.getInfo(access_token)
            .then((response) => {
                setUser(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.error("Access token invalid:", error);
                if (refresh_token) {
                    AuthenticationAPI.refresh(refresh_token).then((response) => {
                        localStorage.setItem(ACCESS_TOKEN_KEY, response.data.access_token);
                        console.log("New Access token: ", response.data.access_token);
                        return AuthenticationAPI.getInfo(response.data.access_token);
                    })
                        .then((response) => {
                            console.log(response.data);
                            setUser(response.data);
                        })
                        .catch((refreshError) => {
                            console.error("Error refreshing token:", refreshError);
                            window.location.reload();
                        });
                }
                else {
                    navigator(LOGIN_PAGE)
                }
            });
    }
    else {
        navigator(LOGIN_PAGE)
    }
}, []);

    const logout = () => {
        const access_token = localStorage.getItem(ACCESS_TOKEN_KEY);
        AuthenticationAPI.logout(access_token).then(
            (response) => {
                console.log(response);
            }
        )
            .catch(
                (error) => console.log(error)
            );
        navigator(LOGIN_PAGE);
    }

    return (
        <div>

            {
                user.fullname &&
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                        <span className="navbar-brand mb-0 h1">
                            Welcome {user.fullname}
                        </span>
                        <button onClick={logout} className="btn btn-danger" type="button">Logout</button>
                    </div>
                </nav>
            }

            <div className="mt-5">

                <button className='btn btn-primary mx-5'>Detect HandId</button>

                <button className='btn btn-primary mx-5'>Register HandId</button>

            </div>

        </div>
    )
}
