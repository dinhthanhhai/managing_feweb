import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "font-awesome/css/font-awesome.min.css";
import { useState, useEffect } from "react";
import {
  fetchGroup,
  createNewUser,
  updateCurrentUser,
} from "../../services/userService";
import { toast } from "react-toastify";
import _ from "lodash";

const ModalUser = (props) => {
  const [userGroup, setUserGroup] = useState([]);

  const { actionModalUser, dataModalUser } = props;

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

  useEffect(() => {
    if (actionModalUser === "UPDATE") {
      setUserData({
        ...dataModalUser,
        group: dataModalUser.Group ? dataModalUser.Group.id : 3,
      });
    } else if (actionModalUser === "CREATE") {
      setUserData({
        ...defaultUserData,
        group: dataModalUser.Group ? dataModalUser.Group.id : 3,
      });
      setValidInputs(validInputsDefault);
    }
  }, [dataModalUser, actionModalUser]);

  const getGroups = async () => {
    let res = await fetchGroup();
    if (res && res.EC === 0) {
      setUserGroup(res.DT);
      if (res.DT && res.DT.length > 0) {
        let groups = res.DT;
        setUserData({ ...userData, group: groups[0].id });
      }
    } else {
      toast.error(res.EM);
    }
  };

  const handleOnchangeInput = (value, name) => {
    let userDataChange = { ...userData };
    userDataChange[name] = value;
    setUserData(userDataChange);
  };

  const checkValidateInput = () => {
    //create user
    if (actionModalUser === "UPDATE") return true;

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
    //create user
    let check = checkValidateInput();
    if (check === true) {
      let res = null;
      if (actionModalUser === "CREATE") {
        res = await createNewUser({
          ...userData,
          groupId: userData["group"],
        });
      } else {
        res = await updateCurrentUser({
          ...userData,
          groupId: userData["group"],
        });
      }
      if (res && res.EC === 0) {
        toast.success(res.EM);
        props.onHide();
        setUserData({ ...defaultUserData, group: userGroup[0].id });
      } else {
        if (res && res.EC !== 0) {
          toast.error(res.EM);
          let _validInputs = _.cloneDeep(validInputsDefault);
          _validInputs[res.DT] = false;
          setValidInputs(_validInputs);
        }
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
          onHide={props.onHide}
          className="modal-user"
          responsive="xxl"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              <span>
                {props.actionModalUser === "CREATE"
                  ? "Create new user"
                  : "Edit a user"}
              </span>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="content-body row">
              <div className="col-12 col-sm-6 form-group">
                <label>
                  Email address<span className="asterisk">*</span> :
                </label>
                <input
                  disabled={actionModalUser === "CREATE" ? false : true}
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
                  disabled={actionModalUser === "CREATE" ? false : true}
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
                {actionModalUser === "CREATE" && (
                  <>
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
                  </>
                )}
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
                  value={userData.sex}
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
                  value={userData.group}
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
              {actionModalUser === "CREATE" ? "Save" : "Update"}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default ModalUser;
