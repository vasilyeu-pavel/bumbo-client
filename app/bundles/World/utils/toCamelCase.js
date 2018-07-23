const toCamelCase = str => {
	return str
	.split('_')
	.map(item => item[0].toUpperCase() + item.slice(1))
	.join('')
}

export default toCamelCase