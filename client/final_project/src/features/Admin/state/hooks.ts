import { useSelector, useDispatch } from "react-redux";

import { selectFields, selectStatus } from "./selectors";

export const useFieldsSelector = ()=>{
    return useSelector(selectFields)
}

export const useFieldsStatus = ()=>{
    return useSelector(selectStatus)
}
