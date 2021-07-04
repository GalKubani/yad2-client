export const calculateDate = (dateOfEntry, editing = false) => {
    let month = dateOfEntry.slice(3, 5)
    if (month[1] === ".") { month = month.slice(0, 1) }
    let advertDate = new Date()
    advertDate.setMonth(month - 1)
    advertDate.setDate(dateOfEntry.slice(0, 2))
    if (editing) {
        if (advertDate.getFullYear !== "2021") {
            advertDate.setYear(2021)
        }
        return advertDate
    }
    if (advertDate < new Date()) { return true }
    else { return false }
}