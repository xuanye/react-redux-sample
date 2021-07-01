import { createAction, handleActions } from '../redux_actions';
// ------------------------------------
// Action Type
// ------------------------------------
export const SET_ASC_SORT_TYPE = 'myapp/address/setasc';
export const SET_DESC_SORT_TYPE = 'myapp/address/setdesc';
export const ADD_ADDRESS_ITEM = 'myapp/address/additem';
export const REMOVE_ADDRESS_ITEM = 'myapp/address/removeitem';
export const EDIT_ADDRESS_ITEM = 'myapp/address/edititem';
export const CANCEL_SAVE_ITEM = 'myapp/address/cancelitem';
export const SAVE_ADDRESS_ITEM = 'myapp/address/saveitem';
export const FILTER_CHANGED = 'myapp/address/filterchanged';
// ------------------------------------
// Actions Creator
// ------------------------------------
// 需要同步处理的Action
export const setASCSortType = createAction(SET_ASC_SORT_TYPE);
export const setDESCSortType = createAction(SET_DESC_SORT_TYPE);
export const addItem = createAction(ADD_ADDRESS_ITEM);
export const removeAddressItem = createAction(REMOVE_ADDRESS_ITEM);
export const editAddressItem = createAction(EDIT_ADDRESS_ITEM);
export const saveAddressItem = createAction(SAVE_ADDRESS_ITEM);
export const filterChanged = createAction(FILTER_CHANGED);
export const cancelSaveItem = createAction(CANCEL_SAVE_ITEM);
// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
    // 各个状态下的订单列表
    list: [
        { name: 'Tom', email: 'Tom@tiok.com', address: 'Shanghai', status: 0 },
        { name: 'David', email: 'David@tiok.com', address: 'Beijing', status: 0 },
        { name: 'Crown', email: 'Crown@tiok.com', address: 'Guangzhou', status: 0 },
        { name: 'Aron', email: 'Aron@tiok.com', address: 'Chongqing', status: 0 },
    ], //{name: '', email: '', address: '',status:0}
    sortType: 0, //0,1,2
    filterText: '',
};

function ascCompare(m, n) {
    var a = m['name'];
    var b = n['name'];
    var x1 = a.toUpperCase();
    var x2 = b.toUpperCase();
    if (x1 < x2) {
        return -1;
    }
    if (x1 > x2) {
        return 1;
    }
    return 0;
}
function descCompare(m, n) {
    var a = m['name'];
    var b = n['name'];
    var x2 = a.toUpperCase();
    var x1 = b.toUpperCase();
    if (x1 < x2) {
        return -1;
    }
    if (x1 > x2) {
        return 1;
    }
    return 0;
}

const reducer = handleActions(
    {
        [SET_ASC_SORT_TYPE]: (state, action) => {
            if (state.sortType == 1) {
                return state;
            }

            return {
                ...state,
                list: [...state.list.sort(ascCompare)],
                sortType: 1,
            };
        },
        [SET_DESC_SORT_TYPE]: (state, action) => {
            if (state.sortType == 2) {
                return state;
            }
            return {
                ...state,
                list: [...state.list.sort(descCompare)],
                sortType: 2,
            };
        },
        [ADD_ADDRESS_ITEM]: (state, action) => {
            return {
                ...state,
                list: [
                    ...state.list,
                    action.payload || { name: '', email: '', address: '', status: 1 },
                ],
            };
        },
        [REMOVE_ADDRESS_ITEM]: (state, action) => {
            const { index } = action.payload;
            state.list.splice(index, 1);
            return {
                ...state,
                list: [...state.list],
            };
        },
        [EDIT_ADDRESS_ITEM]: (state, action) => {
            const { index } = action.payload;
            return {
                ...state,
                list: state.list.map((item, i) => {
                    item.status = i == index ? 2 : 0;
                    return item;
                }),
            };
        },
        [SAVE_ADDRESS_ITEM]: (state, action) => {
            const { index, data } = action.payload;
            return {
                ...state,
                list: state.list.map((item, i) => {
                    item.status = 0;
                    if (i == index) {
                        item.name = data.name;
                        item.email = data.email;
                        item.address = data.address;
                    }
                    return item;
                }),
            };
        },
        [CANCEL_SAVE_ITEM]: (state, action) => {
            const { data } = action.payload;

            if (data.status == 1) {
                state.list.splice(state.list.length - 1, 1);
                //新增
                return {
                    ...state,
                    list: [...state.list],
                };
            } else {
                return {
                    ...state,
                    list: state.list.map((item, i) => {
                        item.status = 0;
                        return item;
                    }),
                };
            }
        },
        [FILTER_CHANGED]: (state, action) => {
            return {
                ...state,
                filterText: action.payload,
            };
        },
    },
    initialState,
);

export default reducer;
