import React from 'react';

import { ModalOverlay, ModalContainer, ModalContent, ModalCloseButton } from './modal-styles';

const Modal = ({ open, setOpen, addClose, children }) => {
	return (
		<div>
			<ModalOverlay open={open} />
			<ModalContainer open={open}>
				<ModalContent>
					{children}
					{addClose ? (
						<ModalCloseButton isSolid bg_color="red" color="#fff" onClick={() => setOpen(false)}>
							Close
						</ModalCloseButton>
					) : null}
				</ModalContent>
			</ModalContainer>
		</div>
	);
};

export default Modal;
