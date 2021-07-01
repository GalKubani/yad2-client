export const calculateDate = (dateOfEntry) => {
    let month = dateOfEntry.slice(3, 5)
    if (month[1] === ".") { month = month.slice(0, 1) }
    let monthName = ""
    switch (month) {
        case "1": monthName = "Jan"; break; case "2": monthName = "Feb"; break; case "3": monthName = "Mar"; break;
        case "4": monthName = "Apr"; break; case "5": monthName = "May"; break; case "6": monthName = "Jun"; break;
        case "7": monthName = "Jul"; break; case "8": monthName = "Aug"; break; case "9": monthName = "Sep"; break;
        case "10": monthName = "Oct"; break; case "11": monthName = "Nov"; break; case "12": monthName = "Dec"; break;
        default: break;
    }
    let advertDate = new Date(dateOfEntry.replace("." + month, " " + monthName).replace(".", " "))
    if (advertDate < new Date()) { return true }
    else { return false }
}