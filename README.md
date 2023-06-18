### Hexlet tests and linter status:
[![Actions Status](https://github.com/IrinaKurb/frontend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/IrinaKurb/frontend-project-46/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/6f5711a10518ce6b5f56/maintainability)](https://codeclimate.com/github/IrinaKurb/frontend-project-46/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/6f5711a10518ce6b5f56/test_coverage)](https://codeclimate.com/github/IrinaKurb/frontend-project-46/test_coverage)

Описание проекта:

Вычислитель отличий – программа, определяющая разницу между двумя структурами данных. Подобный механизм используется при выводе тестов или при автоматическом отслеживании изменений в конфигурационных файлах.

Программа поддерживает работу с форматами yaml, yml, json. 

Программа может работать как с командной строкой, так и быть установленной в качестве библиотеки в сторонний проект.

Отчет генерируется в форматах:
- _plain text_: вывод различий в текстовом формате;
- _stylish_: вывод различий в виде древовидной структуры;
- _json_: вывод различий в JSON формате. Данный формат позволяет использовать вывод в машинном чтении.

Минимальные требования:

1. Наличие установленного терминала;
2. Наличие установленного Node.js

Описание утилиты выводится командой:

 ```
    $ gendiff -h
```

Инструкция по установке и запуск:

1. Установите пакеты, необходимые для работы программы, при помощи команды 
`npm install`, которая скачает их в папку проекта node_modules в соответствии с конфигурацией в файле package.json:

    ```
    $ npm install
    ```

2. Установите пакет в систему с помощью команды: 

    ```
    $ npm link
    ```

3. Запустите генератор командой:

    ```
    $ gendiff  [наименование формата] <путь к файлу1> <путь к файлу2>
    ```

Пути могут быть как абсолютными, так и относительными.

Форматы задаются флагами ```-f```. Имена поддерживаемых форматов:
- stylish (установлен по умолчанию);
- plain;
- json.

Asciinema функционала:

[![asciicast](https://asciinema.org/a/589595.svg)](https://asciinema.org/a/589595)
[![asciicast](https://asciinema.org/a/591926.svg)](https://asciinema.org/a/591926)
[![asciicast](https://asciinema.org/a/592014.svg)](https://asciinema.org/a/592014)