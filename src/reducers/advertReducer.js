const advertReducer = (advertData, action) => {
    switch (action.type) {
        case "GET_ADVERTS":
            return [...action.advertData];
        default:
            return [...advertData]
    }
}
export default advertReducer