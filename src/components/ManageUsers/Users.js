import { useState, useEffect } from "react";
import { fetchAllUsers } from "../../services/userService";

const Users = (props) => {
  const [listUsers, setListUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    let response = await fetchAllUsers();
    if (response && response.data && response.data.EC === 0) {
      setListUsers(response.data.DT);
      console.log(response.data.DT);
    }
  };

  return (
    <div className="container">
      <div className="manage-users-container">
        <div className="user-header">
          <div className="title">
            <h1>Table Users</h1>
          </div>
          <div className="actions">
            <button className="btn btn-success">Refesh</button>
            <button className="btn btn-primary">Add new user</button>
          </div>
        </div>
        <div className="user-container">
          <table className="table table-striped table-bordered table-hover">
            <thead>
              <tr>
                <th scope="col">No</th>
                <th scope="col">Id</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
                <th scope="col">User name</th>
                <th scope="col">Role</th>
              </tr>
            </thead>
            <tbody>
              {listUsers && listUsers.length > 0 ? (
                <>
                  {listUsers.map((item, index) => {
                    return (
                      <tr key={`row-${index}`}>
                        <th scope="row">{index + 1}</th>
                        <td>{item.id}</td>
                        <td>{item.email}</td>
                        <td>{item.phone}</td>
                        <td>{item.username}</td>
                        <td>{item.Group ? item.Group.name : "Null"}</td>
                      </tr>
                    );
                  })}
                </>
              ) : (
                <>
                  <span>Not found users!</span>
                </>
              )}
            </tbody>
          </table>
        </div>
        <div className="user-footer">
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li className="page-item">
                <a className="page-link" href="#">
                  Previous
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  1
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  2
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  3
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  Next
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Users;
