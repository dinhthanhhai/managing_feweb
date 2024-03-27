import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState, useEffect } from "react";
import { fetchGroup } from "../../services/userService";
import { toast } from "react-toastify";

const ModalUser = (props) => {
  const [userGroup, setUserGroup] = useState([]);
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();
  const [address, setAddress] = useState();
  const [sex, setSex] = useState();
  const [group, setGroup] = useState();

  useEffect(() => {
    getGroups();
  }, []);

  const getGroups = async () => {
    let res = await fetchGroup();
    console.log("check res: ", res);
    if (res && res.data && res.data.EC === 0) {
      setUserGroup(res.data.DT);
    } else {
      toast.error(res.data.EM);
    }
  };

  return (
    <>
      <div className="container">
        <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={true}
          className="modal-user"
          responsive="xxl"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              <span>{props.title}</span>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="content-body row">
              <div className="col-12 col-sm-6 form-group">
                <label>
                  Email address<span className="asterisk">*</span> :
                </label>
                <input className="form-control" type="email"></input>
              </div>
              <div className="col-12 col-sm-6 form-group">
                <label>
                  Phone number<span className="asterisk">*</span> :
                </label>
                <input className="form-control" type="text"></input>
              </div>
              <div className="col-12 col-sm-6 form-group">
                <label>User name:</label>
                <input className="form-control" type="text"></input>
              </div>
              <div className="col-12 col-sm-6 form-group">
                <label>
                  Password<span className="asterisk">*</span> :
                </label>
                <input className="form-control" type="password"></input>
              </div>
              <div className="col-12 form-group">
                <label>Address:</label>
                <input className="form-control" type="text"></input>
              </div>
              <div className="col-12 col-sm-6 form-group">
                <label>
                  Gender:<span className="asterisk">*</span> :
                </label>
                <select className=" form-select">
                  <option value="1">Male</option>
                  <option value="2">Female</option>
                  <option value="3">Other</option>
                </select>
              </div>
              <div className="col-12 col-sm-6 form-group">
                <label>
                  Group:<span className="asterisk">*</span> :
                </label>
                <select className=" form-select">
                  {userGroup.length > 0 &&
                    userGroup.map((item, index) => {
                      return (
                        <option key={`group-${index}`} value={item.id}>
                          {item.name}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={props.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={props.confirmDeleteUser}>
              Confirm
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default ModalUser;
