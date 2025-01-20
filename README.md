# Тестовое задание ToDo на React для JavaCode

# Запуск

1. `git clone`
   
2. `make install`
   
3. `make dev`

env-файл оставлю здесь

RENDER_HOST='dpg-cu3stc52ng1s73ceevig-a.oregon-postgres.render.com'

RENDER_PASSWORD='JO4nmoMbWmmGqn0Z8y6grTGUvpX1SSR6'

RENDER_DATABASE='todo_xorx'

ACCESS_TOKEN='random-key'

REFRESH_TOKEN='new-random-key'

PORT=4000

# Демо

[ToDo on React (кликни сюда)](https://test-task-java-code-1b4t.vercel.app/)

## Описание проекта

Фуллстэк-приложение ToDo (код серверной части в папке server). База данных PostreSQL на render.com (если не работает, значит истек бесплатный период).

### Фичи

1. Применена архитектура FSD
2. Аутентификация/регистрация с помощью JWT
3. Реализован CRUD
4. Валидация полей в серверной части. Ошибки отображаются в интерфейсе

### Что нужно добавить/изменить

1. Сделать валидацию при добавлении задачи
2. При редактировании прокинуть старое название в value инпута
3. Добавить состояние ожидания добавления/редактирования данных
4. Посмотреть на лишние рендеры
5. Добавить скелетоны
6. Поменять дизайн)))
7. Добавить роут not found

### Технологии
#### Фронтенд

1. React + TS
2. Redux Toolkit
3. React-router
4. Styled-components

#### Бэкэнд

1. Express
2. PostgreSQL
3. JWT

