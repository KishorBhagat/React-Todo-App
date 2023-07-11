const selectCollectionColor = (name) => {
    switch (name.toLowerCase()) {
        case "school":
            return "#f075a8";
        case "personal":
            return "#5fa9a4";
        case "design":
            return "#ab6edc";
        case "groceries":
            return "#cbb54f";
        case "birthday":
            return "#7ed0ec";
        default:
            // return "#ffffff";
            return "#c84949";
    }
}

export default selectCollectionColor;