import classes from "./categoriesPage.module.scss";

const CategoryItem = ({ category, setActiveCategory }) => {
    return (
        <div
            onClick={() => setActiveCategory(category)}
            className={classes.categoryItem}
        >
            {category?.name}
        </div>
    );
};

export default CategoryItem;
