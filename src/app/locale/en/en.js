export default {
  reusable: {
    send: 'Send',
    close: 'Close',
    ok: 'Ok',
  },
  captcha: {
    error: {
      text: 'Oops! Something went wrong. Please, try again.',
    },
  },
  chat: {
    inputPlaceholder: 'Message',
    events: {
      joined: '{members} joined conversation',
      left: '{member} left conversation',
      closed: 'Chat is closed',
      error: 'An error occured: {error}',
    },
    reopenSession: 'Start new chat',
    previewChatMessage1: 'Good afternoon!\nI am Your chatbot.\n\nHow can I help?',
    previewChatMessage2: 'Hello, \nI would like to ask more details\nabout your services.',
  },
  appointment: {
    form: {
      title: 'Personal information',
      name: {
        label: 'Name',
        placeholder: 'Enter your name',
      },
      email: {
        label: 'Email',
        placeholder: 'Enter your email',
      },
      destination: {
        label: 'Phone number',
        placeholder: 'Enter phone number',
      },
      message: {
        label: 'Message',
        placeholder: 'Enter your message...',
      },
    },
    calendar: {
      title: 'Select Appointment Time',
      timeZone: 'Time Zone',
    },
    success: {
      title: 'Congratulations!',
      subtitle: 'You\'ve scheduled an appointment.',
      cancel: 'Cancel an appointment',
    },
    error: {
      api_valid_origin: 'Invalid request origin',
      appointment_valid_date: 'Invalid date or time slot',
      store_sql_member_appointment_widget_app_error: 'Database error',
      store_sql_member_appointment_get_app_error: 'Reserved, but database error',
      store_sql_member_appointment_cancel_app_error: 'Cancelation error',
    },
  },
  call: {
    startView: {
      title: 'Online Call',
      description: 'You can call us right from here!',
    },
    ringingView: {
      title: 'Ringing',
      description: 'We are looking for an agent. Please wait.',

    },
  },
  errors: {
    fileTooLarge: 'File "{file}" is too large! Maximum size is {maxSize} Mb',
    offline: {
      title: 'Ohh... You\'re offline',
      description: 'Please check your Internet connection and try again',
    },
  },
  emojiPicker: {
    categoriesLabel: 'Categories',
    emojiUnsupportedMessage: 'Your browser does not support color emoji.',
    favoritesLabel: 'Favorites',
    loadingMessage: 'Loading…',
    networkErrorMessage: 'Could not load emoji.',
    regionLabel: 'Emoji picker',
    searchDescription: 'When search results are available, press up or down to select and enter to choose.',
    searchLabel: 'Search',
    searchResultsLabel: 'Search results',
    skinToneDescription: 'When expanded, press up or down to select and enter to choose.',
    skinToneLabel: 'Choose a skin tone',
    skinTonesLabel: 'Skin tones',
    skinTones: [
      'Default',
      'Light',
      'Medium-Light',
      'Medium',
      'Medium-Dark',
      'Dark',
    ],
    categories: {
      custom: 'Custom',
      'smileys-emotion': 'Smileys and emoticons',
      'people-body': 'People and body',
      'animals-nature': 'Animals and nature',
      'food-drink': 'Food and drink',
      'travel-places': 'Travel and places',
      activities: 'Activities',
      objects: 'Objects',
      symbols: 'Symbols',
      flags: 'Flags',
    },
  },
};
