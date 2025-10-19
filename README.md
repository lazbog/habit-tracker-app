# Habit Tracker

A simple and effective habit tracking application built with Next.js 14, TypeScript, and Tailwind CSS. Track your daily habits, monitor your progress, and build consistency in your routine.

## Features

- ✅ Create and manage daily habits
- 📊 Track completion statistics
- 🔥 Monitor streaks and progress
- 📱 Responsive design
- 💾 Local storage for data persistence
- 🎨 Customizable habit icons and colors

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **date-fns** - Date manipulation utilities

## Project Structure

```
habit-tracker-app/
├── app/
│   ├── api/
│   │   └── ping/
│   │       └── route.ts
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── AddHabitForm.tsx
│   ├── HabitItem.tsx
│   └── StatsPage.tsx
├── lib/
│   ├── storage.ts
│   └── types.ts
├── public/
├── .gitignore
├── next.config.js
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.ts
└── tsconfig.json
```

## Usage

1. **Add a Habit**: Click "Add New Habit" and fill in the details including name, description, icon, and color.
2. **Track Progress**: Click the checkmark button to mark habits as complete for the current day.
3. **View Statistics**: Switch to the Statistics tab to see your overall progress, streaks, and completion rates.
4. **Manage Habits**: Delete habits by clicking the trash icon (confirmation required).

## Data Storage

All habit data is stored locally in your browser's localStorage. No data is sent to external servers, ensuring your privacy.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).