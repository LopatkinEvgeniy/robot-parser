const {
  readDomainFromConsole,
  getRobotsFromServer,
  parseRobotsTxt,
} = require('./utils');

// TODO: Validate domain name
// TODO: Normalize domain name

readDomainFromConsole()
  .then(domain => getRobotsFromServer(domain))
  .then(robotsData => parseRobotsTxt(robotsData))
  .then((robotsParsedData) => {
    // Форматированный вывод результата
    console.log(JSON.stringify(robotsParsedData, null, 2));
  })
  .catch(error => console.error(error.message));
