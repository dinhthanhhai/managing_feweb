import { useState, useEffect } from "react";
import { fetchAllUsers, deleteUser } from "../../services/userService";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import ModalDelete from "./ModalDelete";
import ModalUser from "./ModalUser";
import "./Users.scss";

const Users = (props) => {
  const [listUsers, setListUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [isShowModalDelete, serIsShowModalDelete] = useState(false);
  const [dataModal, setDataModal] = useState({});

  useEffect(() => {
    fetchUsers();
  }, [currentPage]);

  const fetchUsers = async () => {
    let response = await fetchAllUsers(currentPage, currentLimit);
    if (response && response.data && response.data.EC === 0) {
      setTotalPages(response.data.DT.totalPages);
      setListUsers(response.data.DT.users);
      console.log(response.data);
    }
  };

  const handlePageClick = async (event) => {
    setCurrentPage(+event.selected + 1);
  };

  const handleDeleteUser = async (user) => {
    setDataModal(user);
    serIsShowModalDelete(true);
  };

  const confirmDeleteUser = async () => {
    let response = await deleteUser(dataModal);
    if (response && response.data.EC === 0) {
      toast.success(response.data.EM);
      await fetchUsers();
      serIsShowModalDelete(false);
    } else {
      toast.error(response.data.EM);
    }
  };

  const handleClose = () => {
    serIsShowModalDelete(false);
    setDataModal({});
  };

  return (
    <>
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
                <tr className="text-center">
                  <th scope="col">No</th>
                  <th scope="col">Id</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone</th>
                  <th scope="col">User name</th>
                  <th scope="col">Role</th>
                  <th scope="col">Actions</th>
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
                          <td className="d-flex justify-content-center ">
                            <button className="btn btn-warning mx-3">
                              Edit
                            </button>
                            <button
                              className="btn btn-danger"
                              onClick={() => handleDeleteUser(item)}
                            >
                              Detete
                            </button>
                          </td>
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

      <ModalDelete
        show={isShowModalDelete}
        handleClose={handleClose}
        confirmDeleteUser={confirmDeleteUser}
        dataModal={dataModal}
      />

      <ModalUser title={"Edit"} />
    </>
  );
};

export default Users;
