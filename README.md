# robot-parser
Http Парсер файла robots.txt, написанный на nodejs

Парсит файл robots.txt указанного домена и выводит информацию о его содержимом в виде:
```js
{
  "Yandex": {
    "Allow": [
      "/*/*/tree/master",
      "/*/*/blob/master"
    ],
    "Disallow": [
      "/ekansa/Open-Context-Data",
      "/ekansa/opencontext-*"
    ]
  },
  "Twitterbot": {
    "Allow": [
      "/*/*/tree/master",
      "/*/*/blob/master"
    ],
    "Disallow": [
      "/ekansa/Open-Context-Data",
      "/ekansa/opencontext-*"
    ]
  }
}
```

### Требования:
* "node": ">=6.10.1"

### Установка и запуск:
```bash
git clone https://github.com/LopatkinEvgeniy/robot-parser.git
cd robot-parser
npm start
```

### Тесты и подсветка eslint:
```bash
npm install
npm run lint
npm run test
```