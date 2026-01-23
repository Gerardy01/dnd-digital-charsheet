# D&D Character Sheet Displayer

A modern, interactive web application designed to visualize Dungeons & Dragons 5th Edition character sheets. This project parses character data from JSON to provide a clean, organized, and accessible digital character sheet experience.

## 🚀 Features

- **Character Overview**: Comprehensive display of character details including Class, Level, Background, and Experience.
- **Combat Dashboard**: Real-time tracking of Hit Points, Armor Class, Speed, Initiative, and Hit Dice.
- **Stat Block**: Visual representation of Ability Scores, Saving Throws, and Skills with proficiency indicators.
- **Action Economy**: Clear categorization of Actions, Bonus Actions, and Reactions for streamlined combat turns.
- **Spellbook**: Organized view of spells by level and source, including slot tracking and spell details.
- **Inventory & Equipment**: Management of gear, currency, and attuned magic items (with encumbrance tracking).
- **Features & Traits**: Consolidated list of racial, class, and background features.
- **Responsiveness**: Built with Ant Design for a polished, responsive user interface.

## 🛠 Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI Component Library**: [Ant Design](https://ant.design/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Routing**: [React Router](https://reactrouter.com/)

## 📦 Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/dnd-charsheet-displayer.git
    cd dnd-charsheet-displayer
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

4.  **Build for production:**
    ```bash
    npm run build
    ```

## 📝 Data Structure

The application expects character data in a specific JSON format. See `data-example.json` in the root directory for a complete reference of the schema, which supports:
- **`characterInfo`**: Basic metadata.
- **`abilities`**, **`savingThrows`**, **`skills`**: Core stats.
- **`combat`**: Health and combat stats.
- **`actionEconomy`**: Actions available in combat.
- **`spellcasting`**: Spells known/prepared and slot tracking.
- **`equipment`**: Inventory items and currency.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.
