import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";

import Search from "./Search.js";
import EmployeesList from "./EmployeesList.js";
//import { StickyContainer, Sticky } from "react-sticky";
import InfiniteList from "./InfiniteList";
import App1 from "./App1.js";

class Home extends Component {
  render() {
    const {
      employees,
      employeesStatus,
      getSearch,
      getEmployees,
      deleteEmployee,
      onToReset,
      getReporters,
      getManager,
      hasMore,
      page,
      field,
      setResultField,
      sort,
      setSort
    } = this.props;
    return (
      // <StickyContainer>
      //   <Sticky>{<h1>Employees Management System Sticky </h1>}</Sticky>
      <div className="main">
        <h1>Employees Management System</h1>

        <Search
          onSearch={getSearch}
          getEmployees={getEmployees}
          onToReset={onToReset}
          setResultField={setResultField}
        />

        <EmployeesList
          employees={employees}
          employeesStatus={employeesStatus}
          onLoad={getEmployees}
          onDelete={deleteEmployee}
          onReporters={getReporters}
          onManager={getManager}
          hasMore={hasMore}
          page={page}
          resultField={field}
          sort={sort}
          setSort={setSort}
        />
        {/* <App1
          employees={employees}
          employeesStatus={employeesStatus}
          onLoad={getEmployees}
          onDelete={deleteEmployee}
          onReporters={getReporters}
          onManager={getManager}
          hasMore={hasMore}
          page={page}
          resultField={field}
          sort={sort}
          setSort={setSort}
        /> */}
        {/* <InfiniteList
          employees={employees}
          employeesStatus={employeesStatus}
          onLoad={getEmployees}
          onDelete={deleteEmployee}
          onReporters={getReporters}
          onManager={getManager}
          hasMore={hasMore}
          page={page}
          resultField={field}
          sort={sort}
          setSort={setSort}
        /> */}
      </div>
      // </StickyContainer>
    );
  }
}

const mapStateToProps = state => {
  return {
    employees: state.employees,
    employeesStatus: state.employeesStatus,
    reset: state.reset,
    hasMore: state.hasMore,
    page: state.page,
    field: state.resultField,
    sort: state.sort,
    scrolling: state.scrolling,
    totalpages: state.totalpages
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getEmployees: page => {
      dispatch(actions.getEmployees(page));
    },
    getSearch: key => {
      dispatch(actions.getSearch(key));
    },
    deleteEmployee: id => {
      dispatch(actions.deleteEmployee(id));
    },
    onToReset: value => {
      dispatch(actions.reset(value));
    },
    getReporters: id => {
      dispatch(actions.getReporters(id));
    },
    getManager: id => {
      dispatch(actions.getManager(id));
    },
    setResultField: value => {
      dispatch(actions.setResultField(value));
    },
    setSort: sort => {
      dispatch(actions.setSort(sort));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
