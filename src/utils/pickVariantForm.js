import VariantForm
    from "../pages/CreateQuestionPage/VariantForm/VariantForm.jsx";
import ConnectionsVariantForm
    from "../pages/CreateQuestionPage/ConnectionsVariantForm/ConnectionsVariantForm.jsx";
import React from "react";

export const pickVariantForm = (gameName) => {
    switch (gameName) {
        case 'select':
            return (
                <VariantForm
                    variants={variants}
                    setVariants={setVariants}
                    open={isVariantFormActive}
                    onClose={() => setIsVariantFormActive(false)}
                />
            )
        case 'connections':
            return (
                <ConnectionsVariantForm
                    variants={variants}
                    setVariants={setVariants}
                    open={isVariantFormActive}
                    onClose={() => setIsVariantFormActive(false)}
                />
            )
        default:
            return (
                <VariantForm open={isVariantFormActive} onClose={() => setIsVariantFormActive(false)}/>
            )
    }
}