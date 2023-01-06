export default {
  reusable: {
    send: 'Відправити',
    close: 'Закрити',
    ok: 'Oк',
  },
  chat: {
    inputPlaceholder: 'Повідомлення',
    events: {
      joined: '{members} приєднався до чату',
      left: '{member} покинув чат',
      closed: 'Чат закритий',
      error: 'Виникла помилка: {error}',
    },
    reopenSession: 'Розпочати новий чат',
    previewChatMessage1: 'Добрий день!\nЯ - Ваш чат-бот.\n\nЧим можу допомогти?',
    previewChatMessage2: 'Добрий день,\nхочу дізнатись детальніше про ваші послуги.',
  },
  appointment: {
    form: {
      title: 'Персональна інформація',
      name: {
        label: 'Ім\'я',
        placeholder: 'Введіть ваше ім\'я',
      },
      email: {
        label: 'Електронна пошта',
        placeholder: 'Введіть електронну пошту',
      },
      destination: {
        label: 'Номер телефону',
        placeholder: 'Введіть номер телефону',
      },
      message: {
        label: 'Повідомлення',
        placeholder: 'Введіть ваше повідомлення...',
      },
    },
    calendar: {
      title: 'Оберіть час дзвінку',
      timeZone: 'Часовий пояс',
    },
    success: {
      title: 'Вітаємо!',
      subTitle: 'Ви запланували дзвінок.',
      cancel: 'Скасувати дзвінок',
    },
    error: {
      api_valid_origin: 'Некорректний origin запиту',
      appointment_valid_date: 'Некоректний слот дати або часу',
      store_sql_member_appointment_widget_app_error: 'Помилка бази даних',
      store_sql_member_appointment_get_app_error: 'Зарезервовано, але помилка бази даних',
      store_sql_member_appointment_cancel_app_error: 'Помилка скасування',
    },
  },
  errors: {
    fileTooLarge: 'Файл "{file}" завеликий! Максимальний розмір файлу: {maxSize} Мб',
  },
  emojiPicker: {
    categoriesLabel: 'Категорії',
    emojiUnsupportedMessage: 'Ваш браузер не підтримує кольорові емодзі.',
    favoritesLabel: 'Улюблені',
    loadingMessage: 'Завантаження…',
    networkErrorMessage: 'Не вдалось завантажити емодзі.',
    regionLabel: 'Emoji picker',
    searchDescription: 'Коли результат пошуку доступний, тисніть кнопки вверх або вниз для навігації, та enter для вибору.',
    searchLabel: 'Пошук',
    searchResultsLabel: 'Результати пошуку',
    skinToneDescription: 'Після відкриття, тисніть кнопки вверх або вниз для навігації, та enter для вибору.',
    skinToneLabel: 'Виберіть тон шкіри',
    skinTonesLabel: 'Тони шкіри',
    skinTones: [
      'За замовчуванням',
      'Світлий',
      'Середньо-світлий',
      'Середній',
      'Середньо-темний',
      'Темний',
    ],
    categories: {
      custom: 'Свій',
      'smileys-emotion': 'Смайли та смайлики',
      'people-body': 'Люди і тіло',
      'animals-nature': 'Тварини та природа',
      'food-drink': 'Їжа та напої',
      'travel-places': 'Подорожі та місця',
      activities: 'Активності',
      objects: 'Об\'єкти',
      symbols: 'Символи',
      flags: 'Прапори',
    },
  },
};
