import { useState, useEffect } from 'react';

const useLongPress = (longPressFn, ms = 800) => {
	const [ startLongPress, setStartLongPress ] = useState(false);
	const [ longPressContent, setLongPressContent ] = useState();

	useEffect(
		() => {
			let longPressTimer;
			if (startLongPress) {
				longPressTimer = setTimeout(() => longPressFn(longPressContent), ms);
			}
			else {
				clearTimeout(longPressTimer);
			}

			return () => {
				clearTimeout(longPressTimer);
			};
		},
		[ longPressFn, longPressContent, ms, startLongPress ]
	);

	return {
		onMouseDown: e => {
			setStartLongPress(true);
			setLongPressContent(e.target);
		},
		onMouseUp: () => {
			setStartLongPress(false);
			setLongPressContent(undefined);
		},
		onMouseLeave: () => () => {
			setStartLongPress(false);
			setLongPressContent(undefined);
		},
		onTouchStart: e => {
			setStartLongPress(true);
			setLongPressContent(e.target);
		},
		onTouchEnd: () => () => {
			setStartLongPress(false);
			setLongPressContent(undefined);
		}
	};
};

export default useLongPress;
