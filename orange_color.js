(function () {
    var customCardPlugin = {
        init: function () {
            this.applyCustomStyles();
            this.applyQualityColors();
            this.observeDynamicContent();

            if (window.Lampa && Lampa.Listener) {
                Lampa.Listener.follow('app', function (e) {
                    if (e.type === 'ready') {
                        customCardPlugin.applyQualityColors();
                    }
                });
            }
        },

        applyCustomStyles: function () {
            var styleId = 'custom-card-plugin-styles';
            if (!document.getElementById(styleId)) {
                var style = document.createElement('style');
                style.id = styleId;
                style.textContent = `
                   /* =========== КАРТОЧКИ КОНТЕНТА =========== */
.card__quality {
    /* Метка качества (HD, 4K и т.д.) */
    position: absolute !important;
    left: -0.8em !important;
    bottom: 3em !important;
    padding: 0.4em 0.6em !important;
    font-size: 0.8em !important;
    font-weight: bold !important;
    border-radius: 0.3em !important;
    text-transform: uppercase !important;
    z-index: 3 !important;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2) !important;
    color: white !important;
}

.card.focus, .card.hover {
    /* Анимация увеличения при фокусе */
    z-index: 2;
    transform: scale(1.1);
    outline: none;
}

.card--tv .card__type {
    /* Бейдж типа контента (ТВ) */
    position: absolute;
    background: linear-gradient(90deg, #ee7700, #cc6600);
    color: #fff;
    z-index: 4;
}

/* =========== ЭФФЕКТЫ ВЫДЕЛЕНИЯ =========== */
.card.focus .card__view::after, 
.card.hover .card__view::after {
    /* Свечение вокруг карточки */
    content: "";
    position: absolute;
    top: -0.5em;
    left: -0.5em;
    right: -0.5em;
    bottom: -0.5em;
    border: 0.3em solid transparent;
    border-radius: 1.4em;
    box-shadow: 0 0 16px #ffd600;
    z-index: 1;
    pointer-events: none;
    animation: border-draw 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

.extensions__item.focus:after,
.explorer-card__head-img.focus::after,
.torrent-item.focus::after {
    /* Общий стиль рамки выделения */
    content: "";
    position: absolute;
    top: -0.5em;
    left: -0.5em;
    right: -0.5em;
    bottom: -0.5em;
    border: 0.3em solid #cc6600;
    border-radius: 1.4em;
    z-index: -1;
    pointer-events: none;
}

.full-episode.focus::after {
    /* Специальный стиль для эпизодов */
    content: "";
    position: absolute;
    left: -0.5em;
    top: -0.5em;
    right: -0.5em;
    bottom: -0.5em;
    border: 0.3em solid #cc6600;
    border-radius: 1.4em;
    pointer-events: none;
}

@keyframes border-draw {
    /* Анимация рисования границы */
    0% { border-color: transparent; clip-path: polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%); }
    25% { border-color: #ee7700; clip-path: polygon(0% 0%, 50% 0%, 0% 0%, 0% 0%); }
    50% { clip-path: polygon(0% 0%, 100% 0%, 50% 100%, 0% 0%); }
    100% { clip-path: none; border-color: #cc6600; }
}
/* Микрофон и клавиатура */
.search-source.active {
  opacity: 1;
  background-color: #ec750f;
  color: #000;
}

.simple-keyboard .hg-button[data-skbtn="{MIC}"] {
  color: #f35b06;
}

/* =========== РЕЙТИНГИ И ГОЛОСОВАНИЕ =========== */
.card__vote {
    /* Контейнер рейтинга */
    display: flex;
    flex-direction: column;
    gap: 1px;
    padding: 3px 3px;
    margin: 2px;
    border-radius: 4px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    color: #fff;
    align-items: center;
}

.card__vote::before {
    /* Иконка звезды */
    content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 -960 960 960'%3E%3Cpath fill='%23cc6600' d='M349.923-241.308 480-320.077l131.077 79.769-34.615-148.307 115.384-99.924L540.077-502 480-642.308 420.923-503l-151.769 13.461 115.384 99.693-34.615 148.538ZM283-150.076l52.615-223.539-173.923-150.847 229.231-18.846L480-754.693l90.077 211.385 228.231 18.846-173.923 150.847L677-150.076 480-268.923 283-150.076Zm197-281.616Z'/%3E%3C/svg%3E");
    width: 24px;
    height: 24px;
    margin-bottom: 1px;
    display: flex;
    justify-content: center;
}

.card__vote-count {
    /* Число рейтинга */
    font-size: 14px;
    font-weight: bold;
    line-height: 1;
}

.explorer-card__head-rate {
    /* Рейтинг в карточке */
    color: #cc6600;
}

.explorer-card__head-rate > svg {
    /* Иконка звезды */
    width: 1.5em !important;
    height: 1.5em !important;
    margin-right: 0.5em;
}

.explorer-card__head-rate > span {
    /* Число рейтинга */
    font-size: 1.5em;
    font-weight: 600;
}

.full-start__rate {
    /* Облик рейтинга в описании карточки */
  background: rgb(243 104 4 / 15%);
  -webkit-border-radius: 0.3em;
  -moz-border-radius: 0.3em;
  border-radius: 0.3em;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -moz-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  font-size: 1.45em;
  margin-right: 1em;
}

/* =========== КНОПКИ И ФОКУС =========== */
.full-start__button {
  margin-right: 0.75em;
  font-size: 1.3em;
  background-color: rgb(245 138 6 / 20%);
  padding: 0.3em 1em;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-border-radius: 1em;
  -moz-border-radius: 1em;
  border-radius: 1em;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -moz-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  height: 2.8em;
  -webkit-flex-shrink: 0;
  -ms-flex-negative: 0;
  flex-shrink: 0;
}

/* =========== НАВИГАЦИЯ И МЕНЮ =========== */
.menu__item.focus, 
.menu__item.traverse, 
.menu__item.hover,
.menuitem.focus.red,
.menuitem.traverse.red,
.menu__item.hover.red,
.broadcast__scan > div,
.broadcast__device.focus,
.head__action.focus, 
.head__action.hover,
.settings-param.focus,
.simple-button.focus,
.selectbox-item.focus,
.full-person.focus {
    /* Общие стили для активных элементов */
    background: linear-gradient(90deg, #ee7700, #cc6600);
    color: #fff;
}

.tag-count.focus {
    /* Особый стиль для тегов */
    background: linear-gradient(90deg, #ee7700, #cc6600);
    color: #000;
}

.settings-folder.focus {
    /* Папка в настройках */
    background: linear-gradient(90deg, #ee7700, #cc6600);
    border-radius: 0em;
}

/* =========== ИНДИКАТОРЫ И БЕЙДЖИ =========== */
.extensions__cub {
    /* Бейдж расширений */
    position: absolute;
    top: 1em;
    right: 1em;
    background-color: rgba(34, 229, 10, 0.32);
    border-radius: 0.3em;
    padding: 0.3em 0.4em;
    font-size: 0.78em;
}

.head__action.active::after {
    /* Индикатор активности */
    content: "";
    display: block;
    width: 0.5em;
    height: 0.5em;
    position: absolute;
    top: 0;
    right: 0;
    background: linear-gradient(90deg, #ee7700, #cc6600);
    border: 0.15em solid #43f015;
    border-radius: 100%;
}

.explorer-card__head-age {
    /* Бейдж возраста */
    border: 1px solid #ffff77;
    border-radius: 0.2em;
    padding: 0.2em 0.3em;
    margin-top: 1.4em;
    font-size: 0.9em;
}

/* =========== ЛОАДЕРЫ =========== */
.activity__loader {
    /* Полноэкранный лоадер */
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: none;
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 24 24' style='display: block; margin: auto;'%3E%3Cpath fill='orange' d='M2,12A11.2,11.2,0,0,1,13,1.05C12.67,1,12.34,1,12,1a11,11,0,0,0,0,22c.34,0,.67,0,1-.05C6,23,2,17.74,2,12Z'%3E%3CanimateTransform attributeName='transform' dur='0.7s' repeatCount='indefinite' type='rotate' values='0 12 12;360 12 12'/%3E%3C/path%3E%3C/svg%3E") no-repeat 50% 50%;
}

.modal-loading {
    /* Лоадер в модальном окне */
    height: 6em;
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 24 24' style='display: block; margin: auto;'%3E%3Cpath fill='orange' d='M2,12A11.2,11.2,0,0,1,13,1.05C12.67,1,12.34,1,12,1a11,11,0,0,0,0,22c.34,0,.67,0,1-.05C6,23,2,17.74,2,12Z'%3E%3CanimateTransform attributeName='transform' dur='0.7s' repeatCount='indefinite' type='rotate' values='0 12 12;360 12 12'/%3E%3C/path%3E%3C/svg%3E") no-repeat 50% 50%;
    background-size: contain;
}

/* =========== ПАНЕЛЬ НАСТРОЕК =========== */
.settings__content {
  position: fixed;
  top: 35;
  left: 100%;
  -webkit-transition: -webkit-transform 0.2s;
  transition: -webkit-transform 0.2s;
  -o-transition: -o-transform 0.2s;
  -moz-transition: transform 0.2s, -moz-transform 0.2s;
  transition: transform 0.2s;
  transition: transform 0.2s, -webkit-transform 0.2s, -moz-transform 0.2s, -o-transform 0.2s;
  background: #262829;
  width: 35%;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -webkit-border-top-left-radius: 2em;
  -webkit-border-top-right-radius: 2em;
  -moz-box-orient: vertical;
  -moz-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  will-change: transform;
  /* Единственное добавление */
  max-height: 95vh;
  overflow-y: auto;
}

@media screen and (max-width: 767px) {
  .settings__content {
    width: 50%;
  }
}
@media screen and (max-width: 580px) {
  .settings__content {
    width: 70%;
  }
}
@media screen and (max-width: 480px) {
  .settings__content {
    width: 100%;
    left: 0;
    top: unset;
    bottom: 0;
    height: auto !important;
    -webkit-transition: none;
    -o-transition: none;
    -moz-transition: none;
    transition: none;
    -webkit-transform: translate3d(0, 100%, 0);
       -moz-transform: translate3d(0, 100%, 0);
            transform: translate3d(0, 100%, 0);
    -webkit-border-top-left-radius: 2em;
       -moz-border-radius-topleft: 2em;
            border-top-left-radius: 2em;
    -webkit-border-top-right-radius: 2em;
       -moz-border-radius-topright: 2em;
            border-top-right-radius: 2em;
    /* Единственное добавление для мобилок */
    max-height: 85vh;
  }
}

.head__action.open-settings {
  position: relative;
  display: inline-block;
}

.head__action.open-settings::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, transparent 40%, white 50%, transparent 60%);
  background-size: 400% 400%;
  animation: blink-effect 1s ease;
  pointer-events: none;
}

/* =========== ТОП-5 КАРТОЧКИ =========== */
.items-line--type-top .items-cards .card:nth-child(1)::before {
    /* Стиль для 1-го места */
    content: "1";
    position: absolute;
    top: 0.1em;
    right: 88%;
    font-size: 18em;
    color: #000000;
    font-weight: 900;
    -webkit-text-stroke: 0.01em #f55f06;
    font-family: "Comic Sans MS", "Luckiest Guy", cursive;
    transform: rotate(-15deg);
    z-index: -1;
}

.items-line--type-top .items-cards .card:nth-child(2)::before {
    /* Стиль для 2-го места */
    position: absolute;
    top: 0.1em;
    right: 88%;
    font-size: 18em;
    color: #000000;
    font-weight: 900;
    -webkit-text-stroke: 0.01em #f55f06;
    font-family: "Comic Sans MS", "Luckiest Guy", cursive;
    transform: rotate(-15deg);
    z-index: -1;
}

.items-line--type-top .items-cards .card:nth-child(3)::before {
    /* Стиль для 3-го места */
    content: "3";
    position: absolute;
    top: 0.1em;
    right: 88%;
    font-size: 18em;
    color: #000000;
    font-weight: 900;
    -webkit-text-stroke: 0.01em #f55f06;
    font-family: "Comic Sans MS", "Luckiest Guy", cursive;
    transform: rotate(-15deg);
    z-index: -1;
}

.items-line--type-top .items-cards .card:nth-child(4)::before {
    /* Стиль для 4-го места */
    content: "4";
    position: absolute;
    top: 0.1em;
    right: 88%;
    font-size: 18em;
    color: #000000;
    font-weight: 900;
    -webkit-text-stroke: 0.01em #f55f06;
    font-family: "Comic Sans MS", "Luckiest Guy", cursive;
    transform: rotate(-15deg);
    z-index: -1;
}

.items-line--type-top .items-cards .card:nth-child(5)::before {
    /* Стиль для 5-го места */
    content: "5";
    position: absolute;
    top: 0.1em;
    right: 88%;
    font-size: 18em;
    color: #000000;
    font-weight: 900;
    -webkit-text-stroke: 0.01em #f55f06;
    font-family: "Comic Sans MS", "Luckiest Guy", cursive;
    transform: rotate(-15deg);
    z-index: -1;
}
    /*Изменение расстояния 4 и 5 карточки */
.items-line--type-top .items-cards .card:nth-child(5) {
  margin-left: 3.7em;
}
.items-line--type-top .items-cards .card:nth-child(4) {
  margin-left: 3.7em;
}

.items-line__more.focus {
  background-color: #cc6600;
  color: #000;
}

/* =========== ПЕРСОНЫ =========== */
.full-person__photo {
    /* Аватар персоны */
    width: 7em;
    height: 7em;
    border-radius: 50%;
    background-color: #fff;
    margin-right: 1em;
    background-size: cover;
    background-position: 50% 50%;
    display: flex;
    align-items: center;
}

.full-start__pg, .full-start__status {
    /* Статус просмотра */
    font-size: 1.2em;
    border: 1px solid #ffeb3b;
    border-radius: 0.2em;
    padding: 0.3em;
}

/* =========== ВЫБОР ЭЛЕМЕНТОВ =========== */
.selectbox-item.selected:not(.nomark)::after, 
.selectbox-item.picked::after {
    /* Индикатор выбора */
    content: "";
    display: block;
    width: 1.2em;
    height: 1.2em;
    border: 0.15em solid #ccc;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    right: 1.4em;
    transform: translateY(-50%);
}

.selectbox-item.selected:not(.nomark)::after, 
.selectbox-item.picked::after {
    /* Анимация заполнения круга */
    border-color: #fff;
    border-top-color: transparent; /* Начинаем с прозрачной верхней границы */
    animation: circle-fill 3s ease-in-out forwards; /* Плавная анимация с фиксацией конечного состояния */
}

@keyframes circle-fill {
    /* 
     * Анимация имитирует "заполнение" круга по часовой стрелке 
     * с одновременным изменением цвета границ
     */
    0% {
        transform: translateY(-50%) rotate(0deg);
        border-color: #ccc; /* Начальный цвет - серый */
        border-top-color: transparent;
        border-right-color: transparent;
        border-bottom-color: transparent;
        border-left-color: transparent;
    }
    25% {
        border-right-color: #fff; /* Появление правой границы */
    }
    50% {
        border-bottom-color: #fff; /* Появление нижней границы */
    }
    75% {
        border-left-color: #fff; /* Появление левой границы */
    }
    100% {
        transform: translateY(-50%) rotate(360deg); /* Полный оборот */
        border-color: #fff; /* Все границы белые */
        border-top-color: #fff; /* Верхняя граница становится видимой в конце */
        box-shadow: 0 0 0 3px rgba(204, 102, 0, 0.3); /* Дополнительный эффект свечения */
    }
}

/* Дополнительные состояния для лучшей визуализации */
.selectbox-item {
    position: relative;
    transition: all 0.3s ease;
}

.selectbox-item:hover {
    background-color: rgba(238, 119, 0, 0.1); /* Подсветка при наведении */
}

.selectbox-item.selected {
    background-color: rgba(204, 102, 0, 0.15); /* Фон для выбранного элемента */
}
                `;
                document.head.appendChild(style);
            }
        },

        applyQualityColors: function () {
            document.querySelectorAll('.card__quality, .card-v2 .card__quality').forEach(el => {
                const quality = el.textContent.trim().toUpperCase();
                let bgColor, textColor = 'white';
                
                switch(quality) {
                    case '4K':
                        bgColor = 'linear-gradient(135deg, #8a2be2, #6a5acd)';
                        break;
                    case 'WEB-DL':
                        bgColor = 'linear-gradient(135deg, #1e90ff, #4169e1)';
                        break;
                    case 'BD':
                    case 'BDRIP':
                        bgColor = 'linear-gradient(135deg, #ffd700, #daa520)';
                        textColor = 'black';
                        break;
                    case 'HDTV':
                        bgColor = 'linear-gradient(135deg, #2ecc71, #27ae60)';
                        break;
                    case 'TC':
                    case 'TS':  // Добавлена поддержка TS
                    case 'TELECINE':
                        bgColor = 'linear-gradient(135deg, #ff6b6b, #e74c3c)';
                        break;
                    default:
                        bgColor = '#fff816';
                        textColor = 'black';
                        break;
                    case 'VHS':
                        bgColor = 'linear-gradient(135deg, #00cccc, #009999)';
                        break;
                    case 'DVDRIP':
                        bgColor = 'linear-gradient(135deg, #88ff88, #aaffaa)';
                        textColor = 'black';
                        break;
                    case 'DVB':
                        bgColor = 'linear-gradient(135deg, #ffddbb, #ff99cc)';
                        textColor = 'black';
                }
                
                el.style.setProperty('background', bgColor, 'important');
                el.style.setProperty('color', textColor, 'important');
            });
        },

        observeDynamicContent: function() {
            new MutationObserver(() => this.applyQualityColors())
                .observe(document.body, {childList: true, subtree: true});
        }
    };

    // Запуск с проверкой
    if (document.readyState === 'complete') {
        setTimeout(() => customCardPlugin.init(), 500);
    } else {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(() => customCardPlugin.init(), 500);
        });
    }
})();
