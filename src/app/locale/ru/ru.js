export default {
  reusable: {
    send: 'Отправить',
    close: 'Закрыть',
    ok: 'Oк',
  },
  chat: {
    inputPlaceholder: 'Сообщение',
    events: {
      joined: '{members} присоединился к чату',
      left: '{member} покинул чат',
      closed: 'Чат закрыт',
      error: 'Возникла ошибка: {error}',
    },
    reopenSession: 'Начать новый чат',
    previewChatMessage1: 'Добрый день!!\nЯ - Ваш чат-бот.\n\nЧем могу помочь?',
    previewChatMessage2: 'Добрый день,\nхочу узнать подробнее о ваших услугах.',
  },
  appointment: {
    form: {
      title: 'Персональная информация',
      name: {
        label: 'Имя',
        placeholder: 'Введите ваше имя',
      },
      email: {
        label: 'Электронная почта',
        placeholder: 'Введите електронную почту',
      },
      destination: {
        label: 'Номер телефона',
        placeholder: 'Введите номер телефона',
      },
      message: {
        label: 'Сообщение',
        placeholder: 'Введите ваше сообщение...',
      },
    },
    calendar: {
      title: 'Выберите время звонка',
      timeZone: 'Часовой пояс',
    },
    success: {
      title: 'Поздравляем!',
      subtitle: 'Вы запланировали звонок.',
      cancel: 'Отменить звонок',
    },
    error: {
      api_valid_origin: 'Некорректный origin запроса',
      appointment_valid_date: 'Некорректный слот времени или даты',
      store_sql_member_appointment_widget_app_error: 'Ошибка базы данных',
      store_sql_member_appointment_get_app_error: 'Зарезервировано, но ошибка базы данных',
      store_sql_member_appointment_cancel_app_error: 'Ошибка отмены',
    },
  },
  call: {
    startView: {
      title: 'Онлайн-звонок',
      description: 'Вы можете позвонить нам прямо отсюда!',
    },
    ringingView: {
      title: 'Ringing',
      description: 'Ищем оператора. Пожалуйста, подождите.',

    },
  },
  errors: {
    fileTooLarge: 'Файл "{file}" слишком большой! Максимальный размер файла: {maxSize} Мб',
  },
  emojiPicker: {
    categoriesLabel: 'Категории',
    emojiUnsupportedMessage: 'Ваш браузер не поддерживает цветовые эмодзи.',
    favoritesLabel: 'Любимые',
    loadingMessage: 'Загрузка…',
    networkErrorMessage: 'Не удалось загрузить эмодзи.',
    regionLabel: 'Emoji picker',
    searchDescription: 'Если результат поиска доступен, нажимайте кнопки вверх или вниз для навигации, и enter для выбора.',
    searchLabel: 'Поиск',
    searchResultsLabel: 'Результаты поиска',
    skinToneDescription: 'После открытия, нажимайте кнопки вверх или вниз для навигации, и enter для выбора.',
    skinToneLabel: 'Выберите тон кожи',
    skinTonesLabel: 'Тон кожи',
    skinTones: [
      'По умолчанию',
      'Светлый',
      'Средне-светлый',
      'Средний',
      'Средне-темный',
      'Темный',
    ],
    categories: {
      custom: 'Свой',
      'smileys-emotion': 'Смайлы и смайлики',
      'people-body': 'Люди и тело',
      'animals-nature': 'Звери и природа',
      'food-drink': 'Еда и напитки',
      'travel-places': 'Путешествия и места',
      activities: 'Активности',
      objects: 'Объекты',
      symbols: 'Символы',
      flags: 'Флаги',
    },
  },
};
