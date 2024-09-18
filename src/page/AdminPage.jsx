import { useState } from "react";


export default function AdminPage() {

  const options = ['staffAcc', 'stuData']
  const [option, setOption] = useState(options[0]);

  const handleChooseOption = (opt) => {
    setOption(opt)
  }

  return (
    <div>

      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">
            {/* Welcome {user.fullname} */}
            Welcome, Administration
          </span>
          <button className="btn btn-danger" type="button">Logout</button>
          {/* onClick={logout} */}
        </div>
      </nav>

      <div className="container-fluid">

        <div className="row mt-5">

          <div className="col-md-2">
            <h2 className="text-center mb-4">Dashboard</h2>

            <hr />

            <div onClick={() => handleChooseOption(options[0])}
              className={option === options[0] ?
                "text-center bg-primary mt-4" : "text-center border border-primary mt-4 text-dark"
              }
              style={{ color: 'white', padding: 15, fontSize: 18 }}>
              Manage Staff Accounts
            </div>

            <div onClick={() => handleChooseOption(options[1])}
              className={option === options[1] ?
                "text-center bg-primary mt-4" : "text-center border border-primary mt-4 text-dark"
              } style={{ color: 'white', padding: 15, fontSize: 18 }}>
              Manage Student Data
            </div>


          </div>

          <div className="col-md-1"></div>

          <div className="col-md-8">

            {
              option === options[0] ?
                <div>

                  <h2 className="text-center mb-4">Manage Staff Accounts</h2>

                  <hr />

                  <button className="btn btn-success mt-3 mb-4"><i className="bi bi-file-earmark-plus"></i>&nbsp;&nbsp;Add Account</button>

                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Username</th>
                        <th scope="col">Fullname</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Active</th>
                        <th scope="col">Role</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">1</th>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td><span className="badge rounded-pill bg-success">Active</span></td>
                        <td></td>
                        <td>
                          <i className="bi bi-pencil-square text-primary"></i>
                        </td>
                      </tr>
                    </tbody>
                  </table>

                </div>
                :
                <div>

                  <h2 className="text-center mb-4">Manage Student Data</h2>

                  <hr />

                </div>
            }

          </div>

          <div className="col-md-1"></div>

        </div>

      </div>

    </div>
  )
}
