import Birthday from "../Components/icons/Birthday";
import DefaultCollection from "../Components/icons/DefaultCollection";
import Design from "../Components/icons/Design";
import Groceries from "../Components/icons/Groceries";
import Personal from "../Components/icons/Personal";
import School from "../Components/icons/School";

const selectCollectionIcon = (collection_name) => {
    switch (collection_name.toLowerCase()) {
        case "school":
            return <School />
        case "personal":
            return <Personal />;
        case "design":
            return <Design />;
        case "groceries":
            return <Groceries />;
        case "birthday":
            return <Birthday />;
        default:
            return <DefaultCollection />;
    }
}

export default selectCollectionIcon;