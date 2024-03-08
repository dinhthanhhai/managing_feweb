import { useState, useEffect } from "react";
import { fetchAllUsers } from "../../services/userService";
import ReactPaginate from "react-paginate";

const Users = (props) => {
  const [listUsers, setListUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(2);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    let response = await fetchAllUsers(currentPage, currentLimit);
    if (response && response.data && response.data.EC === 0) {
      setTotalPages(response.data.DT.totalPages);
      setListUsers(response.data.DT.users);
      console.log(response.data);
    }
  };

  const handlePageClick = (event) => {};

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
                  <tr>
                    <td>Not found users!</td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>
        <div className="user-footer">
          {totalPages > 0 && (
            <ReactPaginate
              nextLabel="next >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              marginPagesDisplayed={2}
              pageCount={totalPages}
              previousLabel="< previous"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              breakLabel="..."
              breakClassName="page-item"
              breakLinkClassName="page-link"
              containerClassName="pagination"
              activeClassName="active"
              renderOnZeroPageCount={null}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Users;
