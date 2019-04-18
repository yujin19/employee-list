import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import * as actions from "../../actions";

const getBase64 = file => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
    reader.readAsDataURL(file);
  });
};

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar: "",
      name: "",
      title: "",
      sex: "M",
      startDate: "",
      officePhone: "",
      cellPhone: "",
      SMS: "",
      email: "",
      managerOption: "null",
      manager: null,
      managerName: null
    };
  }

  componentDidMount() {
    this.props.getValidManagers(this.props.match.params.id);

    this.props.employees.forEach(employee => {
      if (employee._id === this.props.match.params.id) {
        this.setState({
          avatar: employee.avatar === null ? "" : employee.avatar,
          name: employee.name,
          title: employee.title === null ? "" : employee.title,
          sex: employee.sex === null ? "M" : employee.sex,
          startDate: new Date(employee.startDate).toISOString().split("T")[0],
          officePhone:
            employee.officePhone === null ? "" : employee.officePhone,
          cellPhone: employee.cellPhone === null ? "" : employee.cellPhone,
          SMS: employee.SMS === null ? "" : employee.SMS,
          email: employee.email === null ? "" : employee.email,
          managerOption:
            employee.manager === null
              ? "null"
              : employee.manager + "-" + employee.managerName,
          manager: employee.manager,
          managerName: employee.managerName
        });
      }
    });
  }

  nameChange = e => {
    this.setState({ name: e.target.value });
  };

  titleChange = e => {
    this.setState({ title: e.target.value });
  };

  sexChange = e => {
    this.setState({ sex: e.target.value });
  };

  startDateChange = e => {
    this.setState({ startDate: e.target.value });
  };

  officePhoneChange = e => {
    this.setState({ officePhone: e.target.value });
  };

  cellPhoneChange = e => {
    this.setState({ cellPhone: e.target.value });
  };

  SMSChange = e => {
    this.setState({ SMS: e.target.value });
  };

  emailChange = e => {
    this.setState({ email: e.target.value });
  };

  managerChange = e => {
    if (e.target.value === "null") {
      this.setState({
        manager: null,
        managerName: null,
        managerOption: "null"
      });
    } else {
      let managerInfo = e.target.value.split("-");
      let id = managerInfo[0];
      let name = managerInfo[1];
      this.setState({
        manager: id,
        managerName: name,
        managerOption: e.target.value
      });
    }
  };

  avatarChange = e => {
    if (e.target.value) {
      let file = e.target.files[0];
      getBase64(file).then(base64 => {
        this.setState({ avatar: base64 });
      });
    }
  };

  onSubmit = e => {
    e.preventDefault();
    let employee = {
      avatar: this.state.avatar,
      name: this.state.name,
      title: this.state.title,
      sex: this.state.sex,
      startDate: this.state.startDate,
      officePhone: this.state.officePhone,
      cellPhone: this.state.cellPhone,
      SMS: this.state.SMS,
      email: this.state.email,
      manager: this.state.manager,
      managerName: this.state.managerName
    };
    this.props.onSave(this.props.match.params.id, employee);
  };

  render() {
    if (this.props.redirect) {
      return <Redirect to={{ pathname: "/" }} />;
    } else {
      return (
        <div className="edit-employee">
          <form className="myForm" onSubmit={this.onSubmit}>
            <div className="header">
              <h2 className="head">Edit Employee</h2>
            </div>
            <div className="form-content">
              <div className="form-right">
                {this.state.avatar === "" ? (
                  <img
                    className="avatar-large"
                    src="https://img.icons8.com/material/50/000000/user.png"
                    alt="avatar"
                  />
                ) : (
                  <img
                    className="avatar-large"
                    src={this.state.avatar}
                    alt="avatar"
                  />
                )}
                <div>Please select a photo as avator</div>
                <label className="upload-file" htmlFor="my-upload-btn">
                  <input
                    id="my-upload-btn"
                    type="file"
                    accept=".jpg, .jpeg, .png"
                    onChange={this.avatarChange}
                  />
                </label>
              </div>
              <div className="form-left">
                <div className="form-group row">
                  <label htmlFor="name">
                    Name<span className="require-star">*</span>:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    onChange={this.nameChange}
                    value={this.state.name}
                    placeholder="Name"
                    required
                  />
                </div>
                <div className="form-group row">
                  <label htmlFor="title">Title:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    onChange={this.titleChange}
                    value={this.state.title}
                    placeholder="Title"
                  />
                </div>
                <div className="form-group row">
                  <label htmlFor="sex">
                    Sex<span className="require-star">*</span>:
                  </label>
                  <select
                    className="form-control"
                    id="sex"
                    onChange={this.sexChange}
                    value={this.state.sex}
                  >
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                  </select>
                </div>
                <div className="form-group row">
                  <label htmlFor="startDate">
                    Start Date <span className="require-star">*</span>:
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="startDate"
                    onChange={this.startDateChange}
                    value={this.state.startDate}
                    placeholder="Name"
                    required
                  />
                </div>
                <div className="form-group row">
                  <label htmlFor="officePhone">Office Phone:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="officePhone"
                    placeholder="xxx-xxx-xxxx"
                    onChange={this.officePhoneChange}
                    value={this.state.officePhone}
                    maxLength="12"
                    pattern="\d{3}[\-]\d{3}[\-]\d{4}"
                  />
                </div>
                <div className="form-group row">
                  <label htmlFor="cellPhone">Cell Phone:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="cellPhone"
                    placeholder="xxx-xxx-xxxx"
                    onChange={this.cellPhoneChange}
                    value={this.state.cellPhone}
                    maxLength="12"
                    pattern="\d{3}[\-]\d{3}[\-]\d{4}"
                  />
                </div>
                <div className="form-group row">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Email"
                    onChange={this.emailChange}
                    value={this.state.email}
                  />
                </div>
                <div className="form-group row">
                  <label htmlFor="SMS">SMS:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="SMS"
                    placeholder="xxx-xxx-xxxx"
                    onChange={this.SMSChange}
                    value={this.state.SMS}
                    maxLength="12"
                    pattern="\d{3}[\-]\d{3}[\-]\d{4}"
                  />
                </div>
                <div className="form-group row">
                  <label htmlFor="manager">Manager:</label>
                  <select
                    className="form-control"
                    id="manager"
                    onChange={this.managerChange}
                    value={this.state.managerOption}
                  >
                    <option value="null"> </option>

                    {this.props.validManagers.map(manager => {
                      return (
                        <option
                          key={manager._id}
                          value={manager._id + "-" + manager.name}
                        >
                          {manager.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <Link to="/">
                  <button type="submit" className="btn btn-secondary back-btn">
                    Back
                  </button>
                </Link>
                <button type="submit" className="btn btn-primary create-btn">
                  Update
                </button>
              </div>
            </div>
          </form>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    employees: state.employees,
    redirect: state.redirect,
    validManagers: state.validManagers
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSave: (id, employee) => {
      dispatch(actions.editEmployee(id, employee));
    },
    getValidManagers: id => {
      dispatch(actions.getValidManagers(id));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Edit);
