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
    console.log(JSON.stringify(robotsParsedData, null, 2));
  })
  .catch(error => console.error(error.message));
