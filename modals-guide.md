## Модалки
В сборку добавлена сущность модалок.

`pug/base/modal.html` + `sass/blocks/modal.scss` + `js/utils/modal.js` + `js/modules/init-modals.js`

Также в main.pug добавлены две модалки для примера.

### Создаем модалку

```pug
  //- Вызов модалки
  a(href="#", data-modal="success") modal--success link

  //- Инклюд модалки
  +modal("modal--success modal--no-scale modal--fit-content")
    +modal-success()

  //- Содержимое +modal-success()
  mixin modal-success()
    p.modal__description Содержимое модалки
```

В `js/modules/init-modals.js` необходимо найти модалку + ссылки на нее и передать как аргументы в `setupModal()`.

```js
  // аргументы setupModal(modal, closeCallback, modalBtns, openCallback, noPrevDefault)
  // возможна инициализация только с первыми аргументом,
  // если вам нужно открывать модалку в другом месте под какими-нибудь условиями
  const initModals = () => {
    if (modalFeedback && modalFeedbackBtns.length) {
      setupModal(modalFeedback, false, modalFeedbackBtns, false, false);
    }
    if (modalSuccess && modalSuccessBtns.length) {
      setupModal(modalSuccess, false, modalSuccessBtns);
    }
  };
```

Готово. Остается поправить стили через модификатор при необходимости.
Также стоит учесть, если на проекте в разных модалках одинаковый размер заголовков, вертикальные отступы и т.д. - такие элементы имеет смысл внести в базу `sass/blocks/modal.scss`, а не стилизовать каждый раз отдельно для каждой модалки.

❗ Новые базовые модификаторы пишем в `sass/blocks/modal.scss`, а под каждую новую модалку, если ей требуется дополнительная стилизация стоит создавать новый scss файл, а не плодить модификаторы в базовом `modal.scss`

---
