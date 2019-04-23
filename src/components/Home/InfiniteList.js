import React, { Component } from "react";
import ListRow from "./ListRow.js";
import ReduxLazyScroll from "redux-lazy-scroll";
import InfiniteScroll from "react-infinite-scroller";

//const sort = ["name", "dr"];

class InfiniteList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameAsc: "",
      drAsc: "",
      seexSort: "",
      asc: 1
    };
  }

  componentWillMount() {
    this.props.onLoad(this.props.page);
    this.scrollListener = window.addEventListener("scroll", e => {
      this.handleScroll(e);
    });
  }
  nameSort = () => {
    // this.props.setSort("name");
    // this.setState(
    //   {
    //     nameAsc: this.state.nameAsc === 0 ? 1 : -1 * this.state.nameAsc
    //   },
    //   () => this.props.onLoad(1, sort[0], this.state.nameAsc)
    // );

    let arr = this.props.employees;
    if (this.state.nameAsc) {
      this.props.setSort("nameAsc");
      arr.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
    } else {
      this.props.setSort("nameDesc");
      arr.sort((a, b) => {
        return b.name.localeCompare(a.name);
      });
    }
    this.setState({ nameAsc: !this.state.nameAsc });
  };

  sexSort = () => {
    let arr = this.props.employees;
    if (this.state.sexAsc) {
      this.props.setSort("sexAsc");
      arr.sort((a, b) => {
        return a.sex.localeCompare(b.sex);
      });
    } else {
      this.props.setSort("sexDesc");
      arr.sort((a, b) => {
        return b.sex.localeCompare(a.sex);
      });
    }
    this.setState({ sexAsc: !this.state.sexAsc });
  };

  drSort = () => {
    let arr = this.props.employees;
    if (this.state.drAsc) {
      this.props.setSort("drAsc");
      arr.sort((a, b) => {
        return a.directReports.length - b.directReports.length;
      });
    } else {
      this.props.setSort("drDesc");
      arr.sort((a, b) => {
        return b.directReports.length - a.directReports.length;
      });
    }
    this.setState({ drAsc: !this.state.drAsc });
  };

  handleDelete = id => {
    //console.log("handle delete" + id);
    this.props.onDelete(id);
    //this.props.onLoad(1);
    //this.props.setResultField("getEmployees"); //set back resultField
    this.props.onLoad(1);
  };

  handleScroll = e => {
    const { scrolling, totalPages, page } = this.state;
    if (scrolling) return;
    if (totalPages < page) return;
    const lastLi = document.querySelector("ul.employees > li:last-child");
    const lastLiOffset =
      lastLi === null ? 0 : lastLi.offsetTop + lastLi.clientHeight;
    const pageOffset = window.pageYOffset + window.innerHeight;
    var bottonOffset = 20;
    if (pageOffset > lastLiOffset - bottonOffset) this.loadMore();
  };

  loadMore = () => {
    this.setState(
      prevState => ({
        page: prevState.page + 1,
        scrolling: true
      })
      //this.props.onLoad(this.page)
    );
  };
  loadItems = () => {
    // set the scrolling false
    // totalPages: json.total_pages
    console.log("page: " + this.props.page);
    if (this.props.resultField === "getEmployees") {
      this.props.onLoad(this.props.page + 1);
    }
  };

  // componentDidMount() {
  //   this.props.onLoad(1);
  // }

  render() {
    const {
      employees,
      employeesStatus,
      onReporters,
      onManager,
      hasMore,
      sort
    } = this.props;
    console.log(JSON.stringify(employees));

    return (
      <div className="container posts-lazy-scroll">
        <ul className="list">
          <li>
            <span>Avatar</span>
            <span onClick={this.nameSort}>
              Name
              <img
                className="icon"
                src={
                  sort === ""
                    ? "https://img.icons8.com/office/64/000000/sort-up.png"
                    : sort === "nameAsc"
                    ? "https://img.icons8.com/office/64/000000/sort-down.png"
                    : "https://img.icons8.com/office/64/000000/sort-down.png"
                }
                alt="icon"
              />
            </span>
            <span>Title</span>
            <span onClick={this.sexSort}>
              Sex
              <img
                className="icon"
                src={
                  sort === "sexDesc"
                    ? "https://img.icons8.com/office/64/000000/sort-up.png"
                    : sort === "sexAsc"
                    ? "https://img.icons8.com/office/64/000000/sort-down.png"
                    : "https://img.icons8.com/office/64/000000/sort.png"
                }
                alt="icon"
              />
            </span>
            <span>startDate</span>
            <span>officePhone</span>
            <span>cellPhone</span>
            <span>SMS</span>
            <span>email</span>
            <span>manager</span>
            <span onClick={this.drSort}>
              #DR
              <img
                className="icon"
                src={
                  sort === ""
                    ? "https://img.icons8.com/office/32/000000/sort.png"
                    : sort === "drAsc"
                    ? "https://img.icons8.com/office/32/000000/sort-up.png"
                    : "https://img.icons8.com/office/32/000000/sort-down.png"
                }
                alt="icon"
              />
            </span>
            <span>Edit</span>
            <span>Delete</span>
          </li>

          {employees.map(employee => (
            <ListRow
              key={employee._id}
              id={employee._id}
              employee={employee}
              employeeDelete={() => this.handleDelete(employee._id)}
              employeeReporters={() => onReporters(employee._id)}
              employeeManager={() => onManager(employee._id)}
            />
          ))}
        </ul>
        <div className="row posts-lazy-scroll__messages">
          {employeesStatus === "start" && (
            <div className="alert alert-info"> Loading more posts... </div>
          )}

          {!hasMore && employeesStatus !== "fail" && (
            <div className="alert alert-success">
              All the posts has been loaded successfully.
            </div>
          )}
          {employeesStatus === "fail" && (
            <div className="alert alert-danger">Loading Error!</div>
          )}
        </div>
      </div>
    );
  }
}

export default InfiniteList;
