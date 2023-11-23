export default {
  reusable: {
    send: 'Жіберу',
    close: 'Жабу',
    ok: 'Ок',
  },
  chat: {
    inputPlaceholder: 'Хабарлама ',
    events: {
      joined: 'чатқа қосылды',
      left: 'чаттан шықты',
      closed: 'Чат жабық',
      error: 'Қате туындады: {error}',
    },
    reopenSession: 'Жаңа чатты бастаңыз',
    previewChatMessage1: 'Қайырлы күн!!\r\nМен сіздің чат-ботыңыз боламын. \r\n\r\nҚалай көмектесе аламын?',
    previewChatMessage2: 'Қайырлы күн, \r\nмен сіздің қызметтеріңіз туралы толығырақ білгім келеді.',
  },
  appointment: {
    form: {
      title: 'Жеке ақпарат',
      name: {
        label: 'Аты',
        placeholder: 'Атыңызды енгізіңіз',
      },
      email: {
        label: 'Электрондық пошта',
        placeholder: 'Электрондық поштаны енгізіңіз',
      },
      destination: {
        label: 'Телефон нөмірі',
        placeholder: 'Телефон нөмірін енгізіңіз',
      },
      message: {
        label: 'Хабарлама',
        placeholder: 'Хабарламаңызды енгізіңіз...',
      },
    },
    calendar: {
      title: 'Қоңырау уақытын таңдаңыз',
      timeZone: 'Сағаттық белдеу',
    },
    success: {
      title: 'Құттықтаймыз!',
      subtitle: 'Сіз қоңырауды жоспарладыңыз.',
      cancel: 'Қоңыраудан бас тарту',
    },
    error: {
      api_valid_origin: 'Сұраныстың origin жарамсыз',
      appointment_valid_date: 'Күні мен уақыт ұяшығы жарамсыз',
      store_sql_member_appointment_widget_app_error: 'Деректер қорында қате',
      store_sql_member_appointment_get_app_error: 'Резервтелген, бірақ деректер қоры қате ',
      store_sql_member_appointment_cancel_app_error: 'Бас тарту қатесі',
    },
  },
  errors: {
    fileTooLarge: '{file} файлы тым үлкен! Файлдың ең үлкен өлшемі: {maxSize} МБ',
  },
  emojiPicker: {
    categoriesLabel: 'Санаттар',
    emojiUnsupportedMessage: 'Сіздің браузеріңізде түрлі-түсті эмодзилер қосылмайды.',
    favoritesLabel: 'Таңдаулылар',
    loadingMessage: 'Жүктелуде…',
    networkErrorMessage: 'Эмодзи жүктелмеді.',
    regionLabel: 'Emoji picker',
    searchDescription: 'Іздеу нәтижесі қолжетімді болса, навигация үшін жоғары немесе төмен батырмасын  басыңыз және таңдау үшін enter басыңыз.',
    searchLabel: 'Іздеу',
    searchResultsLabel: 'Іздеу нәтижесі ',
    skinToneDescription: 'Ашылғаннан кейін навигация үшін жоғары немесе төмен батырмасын басыңыз және таңдау үшін enter басыңыз.',
    skinToneLabel: 'Терінің түсін таңдаңыз',
    skinTonesLabel: 'Терінің түсі',
    skinTones: [
      'Ұйғарым бойынша ',
      'Ақшыл',
      'Орташа ақшыл',
      'Орташа',
      'Орташа қара',
      'Қара',
    ],
    categories: {
      custom: 'Өз',
      'smileys-emotion': 'Смайл мен смайлдар',
      'people-body': 'Адамдар және дене',
      'animals-nature': 'Жануарлар және табиғат',
      'food-drink': 'Ас және сусындар',
      'travel-places': 'Саяхат және орындар',
      activities: 'Іс-шаралар',
      objects: 'Нысандар',
      symbols: 'Таңбалар',
      flags: 'Жалаулар',
    },
  },
};
