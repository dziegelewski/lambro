import ReactDOM from 'react-dom';

export const smartQuerySelector = target => target instanceof HTMLElement	? target
	: document.querySelector(target);

export const getElementCenter = (target) => {
	const element = smartQuerySelector(target);
	const rect = element.getBoundingClientRect();

	const width = element.offsetWidth;
	const height = element.offsetHeight;

	return {
		left: rect.left + width / 2,
		top: rect.top + height / 2
	};
};

export function removeElement(element) {
	if (element && element.parentNode) {
		element.parentNode.removeChild(element);
	}
}

export function removeThis() {
	removeElement(this);
}

export function createElementFromHTMLString(htmlString) {
  const div = document.createElement('div');
  div.innerHTML = htmlString.trim();
  return div.firstChild;
}

export function appendToBody(element) {
	document.querySelector('body').insertAdjacentElement('beforeend', element);
}


export function triggerClassAnimation(target, className) {
	return new Promise(resolve => {

		const element = smartQuerySelector(target); 
		element.classList.add(className);

		const removeClassOnce = function() {
			element.classList.remove(className);
			element.removeEventListener('animationend', removeClassOnce);
			resolve();
		}

		element.addEventListener('animationend', removeClassOnce);
	})
}

export function getComponentNode(component) {
	return ReactDOM.findDOMNode(component);
}