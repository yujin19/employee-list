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
class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar: "",
      name: "",
      title: "",
      startDate: "",
      sex: "M",
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
    this.props.getAllManagers();
  }

  nameChange = e => {
    this.setState({ name: e.target.value });
  };

  titleChange = e => {
    this.setState({ title: e.target.value });
  };

  startDateChange = e => {
    this.setState({ startDate: e.target.value });
    console.log(this.state.startDate);
  };

  sexChange = e => {
    this.setState({ sex: e.target.value });
  };

  officePhoneChange = e => {
    this.setState({ officePhone: e.target.value });
  };

  cellPhoneChange = e => {
    //\d{3}[\-]\d{3}[\-]\d{4}
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

  onSubmit = e => {
    e.preventDefault();
    let employee = {
      avatar: this.state.avatar,
      name: this.state.name,
      title: this.state.title,
      startDate: this.state.startDate,
      sex: this.state.sex,
      officePhone: this.state.officePhone,
      cellPhone: this.state.cellPhone,
      SMS: this.state.SMS,
      email: this.state.email,
      manager: this.state.manager,
      managerName: this.state.managerName
    };
    this.props.onSave(employee);
  };

  avatarChange = event => {
    event.preventDefault();
    const file = event.target.files[0];
    // const localImageUrl = window.URL.createObjectURL(file);
    // console.log(localImageUrl);
    //this.setState({ avatar: localImageUrl });
    getBase64(file).then(base64 => {
      file.size > 102400
        ? alert("File is too big!")
        : this.setState({ avatar: base64 });
    });
  };

  render() {
    if (this.props.redirect) {
      return <Redirect to={{ pathname: "/" }} />;
    } else {
      return (
        <div className="create-employee">
          <form className="myForm" onSubmit={this.onSubmit}>
            <div className="header">
              <h2 className="head">New Employee</h2>
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
                <div>Please select a photo as avator(100M max)</div>
                <label className="upload-file" htmlFor="my-upload-btn">
                  <input
                    id="my-upload-btn"
                    type="file"
                    accept=".jpg, .jpeg, .png"
                    onChange={this.avatarChange}
                    maxSize="100M"
                  />
                </label>
              </div>
              <div className="form-left">
                <div className="form-group row">
                  <label htmlFor="name">
                    Name <span className="require-star">*</span>:
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
                  <label htmlFor="date">
                    Start Date <span className="require-star">*</span>:
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="date"
                    data-provide="datepicker"
                    onChange={this.startDateChange}
                    value={this.state.startDate}
                    required
                  />
                </div>
                <div className="form-group row">
                  <label htmlFor="sex">
                    Sex <span className="require-star">*</span>:
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
                  Create
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
    redirect: state.redirect,
    validManagers: state.validManagers
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSave: employee => {
      dispatch(actions.addEmployee(employee));
    },
    getAllManagers: () => {
      dispatch(actions.getAllManagers());
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Create);
