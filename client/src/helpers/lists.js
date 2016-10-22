import Immutable from 'immutable'
import { debugConsole } from './logs'

const currentIndexOfListItem = (list, item, idParam) => {
    const itemId = (item instanceof Immutable.Map) ? item.get(idParam) : item[idParam];

    console.log('itemId:' + itemId);
    console.dir(item)
    return list.findIndex(current => { debugConsole(current.get(idParam) + '-=-' + itemId);return current.get(idParam) === itemId; });
}

const updateListItem = (state, listParam, index, update) =>{
    let currentItem = state.getIn([listParam, index]);
    currentItem = currentItem.mergeDeep(update);
    return state.setIn([listParam, index], currentItem);
}

export const tryListItemUpdate = (state, listParam, idParam, item, update) => {
    const i = currentIndexOfListItem(state.get(listParam), item, idParam);
    console.log('i:' + i);
    if (i>-1) {
        //found match
        state = updateListItem(state, listParam, i, update)
    } 
    return state
}