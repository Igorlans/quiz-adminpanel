import { useEffect, useState } from "react";
import SearchInput from "../../components/SearchInput/SearchInput.jsx";
import { Button } from "@mui/material";
import classes from "./categoriesPage.module.scss";
import { useSearch } from "../../hooks/useSearch.js";
import { CategoriesService } from "../../services/FirebaseService.js";
import CategoryItem from "./CategoryItem.jsx";
import CategoryForm from "./CategoryForm.jsx";
import CategoryModal from "./CategoryModal.jsx";

const QuestionPage = () => {
    const [search, setSearch] = useState("");
    const [categories, setCategories] = useState([]);
    const [activeCategory, setActiveCategory] = useState(null);
    const searchedCategories = useSearch(categories, search, "name");
    console.log(activeCategory);

    const [isFormVisible, setIsFormVisible] = useState(false);

    const getCategories = async () => {
        const categories = await CategoriesService.getMany();
        setCategories(categories);
    };

    useEffect(() => {
        getCategories();
    }, []);

    return (
        <>
            <CategoryModal
                category={activeCategory}
                setCategories={setCategories}
                onClose={() => setActiveCategory(null)}
            />
            <div className={classes.categoriesPage}>
                <CategoryForm
                    setCategories={setCategories}
                    open={isFormVisible}
                    onClose={() => setIsFormVisible(false)}
                />

                <h1 className={classes.title}>База питань</h1>
                <div className={classes.header}>
                    <SearchInput search={search} setSearch={setSearch} />
                    <Button
                        style={{ borderRadius: 16 }}
                        color={"secondary"}
                        onClick={() => setIsFormVisible(true)}
                        variant={"contained"}
                    >
                        Створити катеогрію
                    </Button>
                </div>
                <div className={classes.categoriesList}>
                    {searchedCategories?.map((category) => (
                        <CategoryItem
                            key={category.id}
                            category={category}
                            setActiveCategory={setActiveCategory}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};

export default QuestionPage;
