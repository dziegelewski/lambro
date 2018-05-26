export const STRIKE = "STRIKE";
export const HEAL = "HEAL";
export const MONEY_CHANGE = "MONEY_CHANGE";
export const RESET_GAME = "RESET_GAME";
export const HIRE_MERCENARY = "HIRE_MERCENARY";
export const NEXT_ROUND = "NEXT_ROUND";
export const REGENERATE = "REGENERATE";
export const USE_ITEM = "USE_ITEM";
export const SELL_ITEM = "SELL_ITEM";

export function strike() {
	return {
		type: STRIKE
	};
}

export function regenerate(healing) {
	return {
		type: REGENERATE,
		payload: {
			healing,
			isRegenerating: true
		}
	};
}

export function hireMercenary(name) {
	return {
		type: HIRE_MERCENARY,
		payload: name
	};
}

export function resetGame() {
	return {
		type: RESET_GAME
	};
}

export function nextRound() {
	return {
		type: NEXT_ROUND
	};
}

export function useItem(item) {
	return {
		type: USE_ITEM,
		payload: item
	};
}

export function sellItem(item) {
	return {
		type: SELL_ITEM,
		payload: item
	};
}
