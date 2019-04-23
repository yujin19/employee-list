import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import ListRow from "./ListRow";

// const style = {
//   height: 30,
//   border: "1px solid green",
//   margin: 6,
//   padding: 8
// };

class App1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nameAsc: "",
      drAsc: "",
      seexSort: "",
      asc: 1
    };
  }

  // componentWillMount() {
  //   this.loadItems();
  // }
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
    this.props.onLoad(this.props.page);
  };

  loadItems = () => {
    console.log("page" + this.props.page);
    if (this.props.resultField === "getEmployees") {
      this.props.onLoad(this.props.page);
    }
  };
  fetchMoreData = () => {
    // if (this.props.employees.length >= 500) {
    //   this.setState({ hasMore: false });
    //   return;
    // }
    // // a fake async api call like which sends
    // // 20 more records in .5 secs
    // setTimeout(this.props.onLoad(this.props.page + 1), 500);
    this.setState(
      {
        hasMore: false
      },
      () => this.props.onLoad(this.props.page + 1)
    );
  };

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
        <h1>InfiniteScroll with the Employee System</h1>
        <hr />
        <ul className="list">
          <InfiniteScroll
            dataLength={employees.length}
            next={this.fetchMoreData}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            height={400}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            <li>
              <span>Avatar</span>
              <span onClick={this.nameSort}>
                Name
                <img
                  className="icon"
                  src={
                    sort === ""
                      ? "https://img.icons8.com/office/64/000000/sort-down.png"
                      : sort === "nameAsc"
                      ? "https://img.icons8.com/office/64/000000/sort-up.png"
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
                      ? "https://img.icons8.com/office/64/000000/sort-down.png"
                      : sort === "sexAsc"
                      ? "https://img.icons8.com/office/64/000000/sort-up.png"
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
          </InfiniteScroll>
        </ul>
      </div>
    );
  }
}

export default App1;
