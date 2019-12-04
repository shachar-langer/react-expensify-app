// We can't import moment like we did in other files,
// because it'll import the mock (this file) and thus creating an infinate loop
const moment = require.requireActual('moment')

export default (timestamp = 0) => {
    return moment(timestamp)
}