import App from './components/app/App';

const app = new App();

window.onhashchange = app.start;
window.onload = app.start;

console.log(`

Обратите внимание! Точка установки игрушки при перетягивании, находится под курсором. Так же Drag'n'drop у меня некорректно работает в dev tools, если зум не равен 100%. 

#### Кросс-чек. Функционал приложения (200/220) ####

- Вёрстка страниц приложения и навигация между ними (30/30)

- [x] стартовая страница содержит название приложения и кнопку "Начать игру" или аналогичную. Выполняются требования к вёрстке +10
- [x] на странице с ёлкой есть меню с настройками, слоты с добавленными в избранное игрушками, ёлка. Выполняются требования к вёрстке +10
- [x] в header приложения есть навигация, которая позволяет с каждой страницы приложения перейти на две другие страницы +10

- Меню с настройками (50/50)
У пользователя есть возможность:

- [x] выбрать один из нескольких (минимум 8) фонов +10
- [x] выбрать одну из нескольких (минимум 4) ёлок +10
- [x] включить/отключить падающий снег +10
- [x] включить/отключить новогоднюю музыку +10
- [x] выбранные настройки сохраняются в local storage и отображаются при перезагрузке страницы. Если музыка сохранилась включённой, она начинает играть при первом клике. Есть кнопка сброса настроек, которая очищает local storage +10

- Гирлянда (40/40)
Гирлянда реализуется средствами css без использования изображений. У пользователя есть возможность:

- [x] добавить на ёлку мерцающую разноцветную гирлянду +20
- [x] выбрать один из нескольких (минимум 4) цветов лампочек гирлянды или оставить её разноцветной +10
- [x] внешний вид гирлянды соответствует предложенному образцу или является его улучшенной версией +10

- Игрушки в избранном (80/80)

- [x] в слотах находятся игрушки, которые были добавлены в избранное на странице с игрушками +10
если в избранное не была добавлена ни одна игрушка, в слотах отображаются первые 20 игрушек коллекции исходных данных +10
- [x] игрушки из слотов с игрушками можно перетянуть на ёлку используя drag and drop +10
- [x] если в процессе перетягивания игрушку отпускают за пределами ёлки, она возвращается в свой слот +10
- [x] повешенные на ёлку игрушки можно перетягивать в пределах ёлки +10
- [x] повешенные на ёлку игрушки можно снимать с ёлки, при этом они возвращаются в свой слот +10
- [x] возле слота с каждой игрушкой указывается количество игрушек в слоте равное количеству экземпляров игрушки в массиве с исходными данными +10
- [x] когда игрушку "вешают на ёлку" количество игрушек в слоте уменьшается, когда игрушку "снимают с ёлки", количество игрушек в слоте увеличивается, когда все экземпляры игрушки помещаются на ёлку, отображается пустой слот +10

- Дополнительный функционал на выбор (10/20)

- [x] корректный сброс настроек, с изменением содержимого страницы +10

`);
