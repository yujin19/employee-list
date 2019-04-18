import React from "react";
import { Link } from "react-router-dom";
//import {Image} from 'cloudinary-react';

const ListRow = props => {
  let date = props.employee.startDate.substr(0, 10);
  return (
    <li>
      <span>
        {props.employee.avatar === null || props.employee.avatar === "" ? (
          <img
            src="https://img.icons8.com/material/50/000000/user.png"
            alt="icon"
          />
        ) : (
          <img
            className="avatar-small"
            src={props.employee.avatar}
            alt="avatar"
          />
        )}
      </span>
      <span>{props.employee.name}</span>
      <span>{props.employee.title}</span>
      <span>{props.employee.sex}</span>
      <span>{date}</span>
      <span>
        {props.employee.officePhone === null ||
        props.employee.officePhone === "" ? null : (
          <a href={"tel:" + props.employee.officePhone}>
            {props.employee.officePhone}
            <img
              src="https://img.icons8.com/office/16/000000/phone.png"
              alt="icon"
            />
          </a>
        )}
      </span>
      <span>
        {props.employee.cellPhone === null ||
        props.employee.cellPhone === "" ? null : (
          <a href={"tel:" + props.employee.cellPhone}>
            {props.employee.cellPhone}
            <img
              src="https://img.icons8.com/office/16/000000/phone.png"
              alt="icon"
            />
          </a>
        )}
      </span>
      <span>{props.employee.SMS}</span>
      <span>
        {props.employee.email === null || props.employee.email === "" ? null : (
          <a href={"mailto:" + props.employee.email}>{props.employee.email}</a>
        )}
      </span>
      <span>
        {props.employee.managerName === null ? null : (
          <button className="btn btn-link" onClick={props.employeeManager}>
            {props.employee.managerName}
          </button>
        )}
      </span>
      <span>
        {props.employee.directReports.length === 0 ? (
          0
        ) : (
          <button className="btn btn-link" onClick={props.employeeReporters}>
            {props.employee.directReports.length}
          </button>
        )}
      </span>
      <span>
        <Link to={{ pathname: `/edit/${props.employee._id}` }}>
          <button type="button" className="btn btn-light">
            <img
              className="icon"
              src="https://img.icons8.com/ios/50/000000/multi-edit.png"
              alt="icon"
            />
          </button>
        </Link>
      </span>
      <span>
        <button
          type="button"
          className="btn btn-light"
          id={props.employee._id}
          onClick={props.employeeDelete}
        >
          <img
            className="icon"
            src="https://img.icons8.com/color/48/000000/cancel.png"
            alt="icon"
          />
        </button>
      </span>
    </li>
  );
};

export default ListRow;
