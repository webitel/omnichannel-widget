# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Breaking changes:
- `position` structure changed from { bottom, right } to string ['left', 'right']. 'right' is default;
- `baseUrl` renamed to `wsUrl`

### Added:
- responsive mobile layouts

## [0.1.0] - 24.06.2021

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

### Added
- Chatting with base message types (text, files)
- "Joined"/"left"/"close" chat events notifying
- En/Ru/Ua locales (should be passed in config)
- Square/Rounded button + chat UI style (config)
- Received files message download
- Sync session between tabs
- Image file in-chat preview

### Changed
-

### Removed
-
