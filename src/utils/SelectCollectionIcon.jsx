import Birthday from "../Components/icons/Birthday";
import DefaultCollection from "../Components/icons/DefaultCollection";
import Design from "../Components/icons/Design";
import Groceries from "../Components/icons/Groceries";
import Music from "../Components/icons/Music";
import Personal from "../Components/icons/Personal";
import School from "../Components/icons/School";
import Wishlist from "../Components/icons/Wishlist";

const selectCollectionIcon = (collection_name) => {
    switch (collection_name.toLowerCase()) {
        case "school":
            return <School />
        case "personal":
            return <Personal />;
        case "design":
            return <Design />;
        case "groceries":
        case "shopping":
            return <Groceries />;
        case "birthday":
            return <Birthday />;
        case "wishlist":
            return <Wishlist />;
        case "music":
            return <Music />;
        default:
            return <DefaultCollection />;
    }
}

export default selectCollectionIcon;