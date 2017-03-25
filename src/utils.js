const readline = require('readline');
const http = require('http');
const { EOL_REGEXP, ROBOTS_LINE_REGEXP } = require('./regexp');

/*
 * Читает имя домена из консоли
 * */

const readDomainFromConsole = () => new Promise((resolve) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question('Enter domain to parse robots.txt: ', (domain) => {
    rl.close();
    resolve(domain);
  });
});

/*
 * Производит GET запрос на домен к файлу robots.txt
 * */

// TODO: https support
const getRobotsFromServer = domain => new Promise((resolve, reject) => {
  const url = `http://${domain}/robots.txt`;

  http.get(url, (res) => {
    const statusCode = res.statusCode;

    if (statusCode !== 200) {
      reject(new Error(`Can't GET ${url}, response status code: ${statusCode}`));
      return;
    }

    // Читаем тело ответа сервера
    let data = '';

    res.setEncoding('utf8');
    res.on('data', (chunk) => {
      data += chunk;
    });
    res.on('error', (error) => {
      reject(new Error(`Can't GET ${url}, error: ${error.message}`));
    });
    res.on('end', () => resolve(data));
  }).on('error', (error) => {
    reject(new Error(`Can't GET ${url}, error: ${error.message}`));
  });
});

/*
* Парсит строку, представляющую собой содержимое robots.txt
* */

// TODO: exclude comments
const parseRobotsTxt = (robotsData) => {
  const robotsParsedData = {};
  let currentUserAgent = false;

  robotsData.split(EOL_REGEXP)
    .map(line => line.trim())
    .forEach((line) => {
      const res = ROBOTS_LINE_REGEXP.exec(line);

      if (res === null) {
        return;
      }

      const [, key, val] = res;

      if (key === 'User-agent') {
        currentUserAgent = val;

        // Добавляем новый User-agent
        if (!robotsParsedData[currentUserAgent]) {
          robotsParsedData[currentUserAgent] = {
            Allow: [],
            Disallow: [],
          };
        }
      } else if (key === 'Allow') {
        robotsParsedData[currentUserAgent].Allow.push(val);
      } else if (key === 'Disallow') {
        robotsParsedData[currentUserAgent].Disallow.push(val);
      }
    });

  return robotsParsedData;
};

module.exports = {
  readDomainFromConsole,
  getRobotsFromServer,
  parseRobotsTxt,
};
