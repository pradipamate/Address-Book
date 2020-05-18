export const Add = (value) => ({
    type: "ADD_LIST",
    payload: value
})
export const updated = (value) => ({
    type: "FOR_UPDATED",
    payload: value
})
export const RemoveItemFromList = (value) => ({
    type: "REMOVE_ITEM_FOM_LIST",
    payload: value
})

export const ClearList = (value) => ({
    type: "REMOVE_ALL_FOM_LIST"
})