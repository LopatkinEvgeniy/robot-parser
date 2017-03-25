const readline = require('readline');
const http = require('http');
const co = require('co');

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

co(function* generator() {
  const domain = yield readDomainFromConsole();

  // TODO: Validate domain name
  // TODO: Normalize domain name

  const robotsData = yield getRobotsFromServer(domain);

  console.log(robotsData);
}).catch(error => console.error(error.message));

