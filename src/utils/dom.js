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
