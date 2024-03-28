import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState, useEffect } from "react";
import { fetchGroup, createNewUser } from "../../services/userService";
import { toast } from "react-toastify";
import _ from "lodash";

const ModalUser = (props) => {
  const [userGroup, setUserGroup] = useState([]);

  const defaultUserData = {
    email: "",
    phone: "",
    username: "",
    password: "",
    address: "",
    sex: "",
    group: "",
  };

  const validInputsDefault = {
    email: true,
    phone: true,
    username: true,
    password: true,
    address: true,
    sex: true,
    group: true,
  };

  const [userData, setUserData] = useState(defaultUserData);
  const [validInputs, setValidInputs] = useState(validInputsDefault);

  useEffect(() => {
    getGroups();
  }, []);

  const getGroups = async () => {
    let res = await fetchGroup();
    console.log("check res: ", res.data.DT);
    if (res && res.data && res.data.EC === 0) {
      setUserGroup(res.data.DT);
      if (res.data.DT && res.data.DT.length > 0) {
        let groups = res.data.DT;
        setUserData({ ...userData, group: groups[0].id });
      }
    } else {
      toast.error(res.data.EM);
    }
  };

  const handleOnchangeInput = (value, name) => {
    let userDataChange = { ...userData };
    userDataChange[name] = value;
    setUserData(userDataChange);
  };

  const checkValidateInput = () => {
    //create user
    setValidInputs(validInputsDefault);

    let arr = ["email", "phone", "password", "group"];
    let check = true;
    for (let i = 0; i < arr.length; i++) {
      if (!userData[arr[i]]) {
        let _validInputs = _.cloneDeep(validInputsDefault);
        _validInputs[arr[i]] = false;
        setValidInputs(_validInputs);

        toast.error(`Empty input ${arr[i]}`);
        check = false;
        break;
      }
    }

    return check;
  };

  const handleConfirmUser = async () => {
    let check = checkValidateInput();
    if (check === true) {
      let res = await createNewUser({
        ...userData,
        groupId: userData["group"],
      });
      if (res.data && res.data.EC === 0) {
        props.onHide();
      } else {
        toast.error("Error create user!");
      }
    }
  };

  return (
    <>
      <div className="container">
        <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={props.isShowModalUser}
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
                <input
                  className={
                    validInputs.email
                      ? "form-control"
                      : "form-control is-invalid"
                  }
                  type="email"
                  value={userData.email}
                  onChange={(event) =>
                    handleOnchangeInput(event.target.value, "email")
                  }
                ></input>
              </div>
              <div className="col-12 col-sm-6 form-group">
                <label>
                  Phone number<span className="asterisk">*</span> :
                </label>
                <input
                  className={
                    validInputs.phone
                      ? "form-control"
                      : "form-control is-invalid"
                  }
                  type="text"
                  value={userData.phone}
                  onChange={(event) =>
                    handleOnchangeInput(event.target.value, "phone")
                  }
                ></input>
              </div>
              <div className="col-12 col-sm-6 form-group">
                <label>User name:</label>
                <input
                  className="form-control"
                  type="text"
                  value={userData.username}
                  onChange={(event) =>
                    handleOnchangeInput(event.target.value, "username")
                  }
                ></input>
              </div>
              <div className="col-12 col-sm-6 form-group">
                <label>
                  Password<span className="asterisk">*</span> :
                </label>
                <input
                  className={
                    validInputs.password
                      ? "form-control"
                      : "form-control is-invalid"
                  }
                  type="password"
                  value={userData.password}
                  onChange={(event) =>
                    handleOnchangeInput(event.target.value, "password")
                  }
                ></input>
              </div>
              <div className="col-12 form-group">
                <label>Address:</label>
                <input
                  className="form-control"
                  type="text"
                  value={userData.address}
                  onChange={(event) =>
                    handleOnchangeInput(event.target.value, "address")
                  }
                ></input>
              </div>
              <div className="col-12 col-sm-6 form-group">
                <label>
                  Gender:<span className="asterisk">*</span> :
                </label>
                <select
                  className=" form-select"
                  onChange={(event) =>
                    handleOnchangeInput(event.target.value, "sex")
                  }
                >
                  <option value="1">Male</option>
                  <option value="2">Female</option>
                  <option value="3">Other</option>
                </select>
              </div>
              <div className="col-12 col-sm-6 form-group">
                <label>
                  Group:<span className="asterisk">*</span> :
                </label>
                <select
                  className={
                    validInputs.group
                      ? "form-select"
                      : "form-control is-invalid"
                  }
                  onChange={(event) =>
                    handleOnchangeInput(event.target.value, "group")
                  }
                >
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
            <Button variant="secondary" onClick={props.onHide}>
              Close
            </Button>
            <Button variant="primary" onClick={() => handleConfirmUser()}>
              Confirm
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default ModalUser;
