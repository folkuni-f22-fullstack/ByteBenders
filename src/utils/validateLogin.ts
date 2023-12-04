const isValidLogin = (name: string, password: string): boolean => {
	const nameRegex: RegExp = /^[A-Za-z0-9]{2,}$/;
	const passwordRegex: RegExp = /^[A-Za-z0-9.,!?-_]{8,}$/;

	const nameMatch: RegExpMatchArray | null = name.match(nameRegex);
	const passwordMatch: RegExpMatchArray | null =
		password.match(passwordRegex);

	if (nameMatch && passwordMatch) {
		return true;
	} else {
		return false;
	}
};

export default isValidLogin;
