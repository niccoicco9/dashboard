<div align="center">
  <img src="src/assets/dashboard.svg" width="200" height="auto" alt="Dashboard"/>
</div>

# Dashboard

Web app to explore and filter users with infinite scroll, side panel and light/dark theme.

This app has been created as part of a technical exercise.

## Features

- Search users by name/email
- Filter by role
- User list with infinite scroll and loading skeletons
- Side panel with user details
- Light/dark theme with persistence
- Centralized error handling

## How to run the project

1. Clone the repository
2. Install dependencies
   - npm: `npm install`
3. Start the development environment
   - npm: `npm run dev`
4. Open the browser at the address shown in console (e.g. http://localhost:5173)


## Testing

- Framework: Vitest + Testing Library
- Command: `npm run test`

## Technologies used

- **React** + **TypeScript**
- **Vite**
- **SCSS Modules** (design tokens, mixins)
- **Axios** for HTTP calls
- **React Router**
- **Lucide React** for icons
- **Vitest** / **@testing-library** for testing

## Design

The web app has a simple and modern design. It focuses on a few primary colors and clean shapes. It uses icons from Lucide React, which enhance clarity while maintaining a lightweight, elegant look.

## Architecture

- `src/components`: UI components (atomic and composite)
- `src/pages`: main pages
- `src/hooks`: reusable custom hooks
- `src/services`: HTTP services, mappers and error utilities
- `src/styles`: tokens, themes, mixins, global styles
- `src/consts`: configuration constants

## Accessibility

- Semantic HTML (header, main, etc.)
- ARIA where necessary (dialog for side panel, loading announcements)
- Focus management and ESC for panel closing
- Contrast and motion preferences respected

## API

This app uses the public [Random User API](https://randomuser.me).


## Next steps

- Edit user data (side panel form)
- Full accessibility audit and keyboard traps review
- Internationalization (i18n)

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

## Author

Niccolò Tondi