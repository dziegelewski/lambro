import heroRegeneration from 'utils/heroRegeneration';
import { wait } from 'utils/helpers';

const regenerationPerSecond = 2;
const regeneratioInterval = 1000;

function gameManager(store) {

	const startRgenerationStream = () => heroRegeneration.start(store, regenerationPerSecond, regeneratioInterval);

	startRgenerationStream();
	wait(500)
		.then(startRgenerationStream)

}

export default gameManager;