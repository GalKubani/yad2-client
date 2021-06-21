export const userDataInitialState = {}

const loginReducer = (userData, action) => {
    console.log(action)
    switch (action.type) {
        case "LOGIN_USER":
            return { data: { ...action.userData }, token: action.token };
        case "LOGOUT_USER":
            return { data: null, token: "" };
        case "UPDATE_USER":
            return { data: { ...action.userData }, token: action.token };
        default:
            return { ...userData }
    }
}
export default loginReducer