const date = '25/12/2022'

const [day, month, year] = date.split('/');

const result = [year, month, day].join('-')

console.log(result);