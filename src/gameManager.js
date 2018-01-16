import heroRegeneration from './heroRegeneration';

const regenerationPerSecond = 2;
const regeneratioInterval = 500;

function gameManager(store) {

	heroRegeneration.start(store, regenerationPerSecond, regeneratioInterval);
}

export default gameManager;