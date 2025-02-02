# Решение тестового задания для стажировки Фронтенд-разработчик Развитие нового портала Mail.ru

Решение тестового задания на стажировку от компании VK.

Во время выполнения тестового задания были достигнуты следующие цели:
- Выполнена задача 1
- Выполнена задача 2
- Выполнена задача 3
- Выполнены дополнительные задачи

Были выбраны следующие библиотеки на основе предложенных в тестовом задании:
- React Router
- Axios
- MobX

А также были установлены пакет *serve* для запуска React-приложения в режиме "production" и *SCSS/Sass* для более удобной работы со стилями.

В качестве сервера с открытым API было решено воспользоваться [Кинопоиском API](https://kinopoisk.dev/).

# Запуск
Перед запуском нужно скопировать файл *.env.default* в *.env*, так как только с этим файлом работает React. Либо можно напрямую считать файл перед запуском. Переменные окружения, используемые в приложении:
```env
REACT_APP_API_KEY="Токен_для_работы_с_API"
REACT_APP_SERVER_URL="Путь_до_сервера"
```

Следующим пунктом является выполнение команды в консоли в режиме "development" или "production":
- Режим "development"
```bash
npm run start
```
- Режим "production"
```bash
npm run build
serve -s build
```
После этого приложение запустится. Спасибо за внимание!
