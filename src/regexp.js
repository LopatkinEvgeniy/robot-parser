// Универсальный перевод строки (не зависит от платформы)
const EOL_REGEXP = /\r\n?|\n/;

// Парсит строку из robots.txt на ключ и значение
const ROBOTS_LINE_REGEXP = /^\s*([^#\s]+)\s*:(?:\s)*([^#\s]+)/;

module.exports = {
  EOL_REGEXP,
  ROBOTS_LINE_REGEXP,
};
