import { MAX_PACK } from '../consts';
import { CRAFT_ITEM, REMOVE_ITEM, PUT_ITEM, PUT_ITEM_OFF, RESET_GAME } from '../actions';

import Forge from '../Forge';

const inventory = [
	...Forge.craftMany(2),
		 Forge.brew(),
	...Forge.craftMany(2),
		 Forge.brew()
]

export default function (state = inventory, action) {
	switch (action.type) {
		default:
		return state;

		case RESET_GAME:
		Forge.startFromScratch();
		return [];

		case CRAFT_ITEM:
		if (state.length < MAX_PACK) {
			return [...state, Forge.craft() ]
		} else {
			return state;
		}

		case REMOVE_ITEM:
		return state.filter(item => item.id !== action.payload)

		case PUT_ITEM:
		const { id, type } = action.payload;
		return state.map(item => {
			if (item.type === type) {
				item.isUsed = item.id === id;
			}
			return item
		})

		case PUT_ITEM_OFF:
		return state.map(item => {
			if (item.type === action.payload.type) {
				item.isUsed = false
			}
			return item
		})

	}
}