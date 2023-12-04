import { ReactNode } from 'react';

export type linkObject = {
	icon: ReactNode;
	text: string;
	to: string;
	class?: string;
};

export type MenuLinkProps = {
	linkto: string;
	icon: ReactNode;
	text: string;
};
