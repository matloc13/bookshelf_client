const singleListReducer = (state, action) => {
    switch (action.type) {
        case 'SET_SINGLE_LIST':
            return (state = action.list);

        default:
            return;
    }
};
export default singleListReducer;
