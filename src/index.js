const {
  readDomainFromConsole,
  normalizeDomainName,
  getRobotsFromServer,
  parseRobotsTxt,
} = require('./utils');

readDomainFromConsole()
  .then(domain => normalizeDomainName(domain))
  .then(domain => getRobotsFromServer(domain))
  .then(robotsData => parseRobotsTxt(robotsData))
  .then((robotsParsedData) => {
    // Форматированный вывод результата
    console.log(JSON.stringify(robotsParsedData, null, 2)); // eslint-disable-line no-console
  })
  .catch(error => console.error(error.message)); // eslint-disable-line no-console
