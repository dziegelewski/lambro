import { REGENERATE } from "./actions";

let timerID;

function start(store, perSecond, healingInterval) {
	const healing = Math.floor(perSecond * healingInterval / 1000);
	const dispatchRegeneration = function() {
		store.dispatch({
			type: REGENERATE,
			payload: {
				healing,
				isRegenerating: true
			}
		});
	};

	timerID = setInterval(dispatchRegeneration, healingInterval);
}

function stop() {
	clearInterval(timerID);
}

export default {
	start,
	stop
};
