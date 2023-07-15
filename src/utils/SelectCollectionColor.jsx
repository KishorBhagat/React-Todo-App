const selectCollectionColor = (name) => {
    switch (name.toLowerCase()) {
        case "school":
            return "#f075a8";
        case "personal":
            return "#5fa9a4";
        case "design":
            return "#ab6edc";
        case "groceries":
        case "shopping":
            return "#cbb54f";
        case "birthday":
            return "#7ed0ec";
        case "wishlist":
            return "#e51f5b";
        case "music":
            return "#46be4e";
        default:
            // return "#ffffff";
            return "#c84949";
    }
}

export default selectCollectionColor;