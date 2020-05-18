const Addressbook = [];

export default (state = Addressbook, action) => {
    switch (action.type) {
        case 'ADD_LIST':
            return [
                ...state, action.payload
            ];

        case 'REMOVE_ITEM_FOM_LIST':
            var selected = action.payload
            var index = state.findIndex(x => x.id === selected);
            state.splice(index, 1);
            return [...state];

        case 'FOR_UPDATED':
            var All_edit_data = action.payload;
            const data = state.find(item => item.id === All_edit_data.id);
            data.item.first_name = All_edit_data.first_name;
            data.item.last_name = All_edit_data.last_name;
            data.item.contact_number = All_edit_data.contact_number;
            data.item.email = All_edit_data.email;

            return [...state];

        default:
            return state;
    }
}