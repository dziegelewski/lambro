export const CRAFT_ITEM = 'CRAFT_ITEM';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const PUT_ITEM = 'PUT_ITEM';
export const PUT_ITEM_OFF = 'PUT_ITEM_OFF';
export const STRIKE = 'STRIKE';
export const HEAL = 'HEAL';
export const MONEY_CHANGE = 'MONEY_CHANGE';
export const RESET_GAME = 'RESET_GAME';
export const HIRE_MERCENARY = 'HIRE_MERCENARY';
export const NEXT_ROUND = 'NEXT_ROUND';

export function craftItem(options) {
	return {
		type: CRAFT_ITEM,
		payload: options
	}
}

export function removeItem(id) {
	return {
		type: REMOVE_ITEM,
		payload: id
	}
}

export function putItem(item) {
	return {
		type: PUT_ITEM,
		payload: item
	}
}

export function putItemOff(item) {
	return {
		type: PUT_ITEM_OFF,
		payload: item
	}
}

export function strike(damage) {
	return {
		type: STRIKE,
		payload: damage
	}
}

export function heal(damage) {
	return {
		type: HEAL,
		payload: damage
	}
}

export function moneyChange(amount) {
	return {
		type: MONEY_CHANGE,
		payload: amount
	}
}

export function hireMercenary(name) {
	return {
		type: HIRE_MERCENARY,
		payload: name
	}
}


export function resetGame() {
	return {
		type: RESET_GAME
	}
}

export function nextRound() {
	return {
		type: NEXT_ROUND
	}
}