import React from 'react';

import { ModalOverlay, ModalContainer, ModalContent, ModalCloseButton } from './modal-styles';

const Modal = ({ open, setOpen, children }) => {
	// const handleClick = e => {
	// 	console.log(e);
	// 	e.stopPropagation();
	// 	e.preventDefault();
	// };

	return (
		<div>
			<ModalOverlay open={open} />
			<ModalContainer open={open}>
				<ModalContent>
					{children}
					<ModalCloseButton isSolid bg_color="red" color="#fff" onClick={() => setOpen(false)}>
						Close
					</ModalCloseButton>
				</ModalContent>
			</ModalContainer>
		</div>
	);
};

export default Modal;
