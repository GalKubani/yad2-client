export const loginUser = (userData, token) => ({
    type: "LOGIN_USER",
    userData,
    token
})
export const logoutUser = () => ({
    type: "LOGOUT_USER"
})