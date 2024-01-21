import { useMemo } from "react";

export const useSearch = (array, query, searchBy) => {
    return useMemo(() => {
        return array?.filter((item) =>
            item[searchBy]?.toLowerCase()?.includes(query?.toLowerCase())
        );
    }, [query, array]);
};
