import { ReactNode } from 'react';

export type linkObject = {
	icon: ReactNode;
	text: string;
	to: string;
	class?: string;
};
