# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

### Not Implemented

- In-chat action buttons
- "non-working hours" functionality
- Telegram/Viber/Whatsapp redirecting
- Reply/forward/edit message functionality
- Avatars
- Client file sending
- Image file fullscreen preview
- Persistent session (keep chat history even if all tabs closed *Service Worker*)
- Client input forms (Форми по типу "передзвоніть мені на такий-то номер", "Мене звати так-то", етц)

### Existing bugs:

- on worker mode, each tab creates new worker
- on worker mode, messages are drawn as many times as there's opened tabs

## [Unreleased]

## [22.01.0] - 20.01.2022
Moved to the same semantic versioning as other Webitel frontend applications

## [0.2.3] - 29.09.2021

### Added:

- openTimeout config prop
- previewMode dev config prop
- chat window opening on message
- chat scroll to bottom on message, after refresh, after open
- "Reopen session" Button

### Refactor:

- refactored main thread websocket strategy
- refactored chat.js store

### Fixed:

- some small bugfixes

## [0.2.2] - 16.09.2021

# Added:

- logoUrl config prop

## [0.2.1] - 13.09.2021

### Added:

- message text links linkifying
- chat input newline on ctrl+enter and shift+enter

### Fixed:

- fixed representation of linebreaks in text messages
- fixed "send message" button

## [0.2.0] - 10.09.2021

### Breaking changes:

- `position` structure changed from { bottom, right } to string ['left', 'right']. 'right' is default;
- `baseUrl` renamed to `wsUrl`

### Added:

- **NOW CHAT WORKS ONLY IN MAIN THREAD MODE** (check Existing bugs section)
- responsive mobile layouts
- main thread socket fallback, if SharedWorker() or BroadcastChannel() is not supported

## [0.1.0] - 24.06.2021

### Added

- Chatting with base message types (text, files)
- "Joined"/"left"/"close" chat events notifying
- En/Ru/Ua/Kz locales (should be passed in config)
- Square/Rounded button + chat UI style (config)
- Received files message download
- Sync session between tabs
- Image file in-chat preview

### Changed

### Removed
