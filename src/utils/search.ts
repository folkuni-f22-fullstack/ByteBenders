function stringIncludes(longString: string, shortString: string) {
	let ls = longString.toLowerCase();
	let ss = shortString.toLowerCase();
	return ls.includes(ss);
}

function dishMatch(dish: string, searchString: string) {
	if (stringIncludes(dish, searchString)) {
		return true;
	} else {
		return false;
	}
}

export default dishMatch;
