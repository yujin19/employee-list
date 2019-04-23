const InitState = {
  employees: [],
  employeesStatus: "",
  redirect: false,
  reset: false,
  hasMore: true,
  page: 1,
  // getEmployees, search, getReporter, getManager
  resultField: "getEmployees",
  sort: "",
  validManagers: [],
  isLoading: true,
  cursor: 0,
  totalPages: null,
  scrolling: false
};

const reducer = (state = InitState, action) => {
  console.log("Action received: ");
  console.log(state, action.type);
  switch (action.type) {
    case "FETCH_EMPLOYEES_FAIL":
      return {
        ...state,
        employeesStatus: "fail",
        hasMore: false,
        isLoading: false,
        cursor: 0
      };
    case "FETCH_EMPLOYEES_START":
      return {
        ...state,
        employeesStatus: "start",
        page: action.page,
        hasMore: true,
        isLoading: true
      };
    case "FETCH_EMPLOYEES_SUCCESS":
      return {
        ...state,
        employeesStatus: "success",
        employees: [...state.employees, ...action.employees],
        hasMore: action.hasMore,
        isLoading: false,
        cursor: state.cursor + 1,
        scrolling: false,
        totalPages: action.totalPages
      };
    case "REDIRECT":
      return { ...state, redirect: action.value };
    case "RESET":
      return action.value
        ? {
            ...state,
            employees: [],
            page: 1,
            hasMore: true,
            reset: true,
            sort: ""
          }
        : { ...state, reset: false };
    case "CHANGE_FIELD":
      return { ...state, resultField: action.field };
    case "CHANGE_SORT":
      return { ...state, sort: action.sort };
    case "FETCH_VALID_MANAGERS_SUCCESS":
      return { ...state, validManagers: action.validManagers };
    default:
      return state;
  }
};

export default reducer;
