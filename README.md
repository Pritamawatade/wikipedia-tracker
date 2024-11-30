# Wikipedia Article Progress Tracker

A Chrome extension built with React and Tailwind CSS that helps you track your progress while reading Wikipedia articles.

## Features

- Track reading progress of Wikipedia articles
- Visual progress indicator
- Seamless integration with Wikipedia pages
- Modern UI built with React and Tailwind CSS

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Google Chrome browser

## Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/yourusername/wikipedia-tracker.git
cd wikipedia-tracker
```

2. Install dependencies:
```bash
npm install
```

3. Build the extension:
```bash
npm run build
```

## Loading the Extension in Chrome

1. Open Google Chrome
2. Navigate to `chrome://extensions/`
3. Enable "Developer mode" by toggling the switch in the top right corner
4. Click "Load unpacked"
5. Select the `dist` folder from your project directory

## Development

To run the extension in development mode:

```bash
npm run dev
```

This will watch for file changes and automatically rebuild the extension.

## Project Structure

- `src/` - Contains React components and main application code
- `public/` - Contains static assets and extension manifest
- `dist/` - Contains the built extension (created after running build)

## Technologies Used

- React.js
- Tailwind CSS
- Vite
- Chrome Extension APIs

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details
