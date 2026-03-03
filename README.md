# Joplin Word Count, Spell Check & Reading Metrics

A lightweight, real-time statistics panel for Joplin. This plugin helps writers, students, and researchers track their progress by providing live word counts, estimated reading times, and instant spell checking — all directly within the Joplin interface.

## Features

* **Real-time Word Count**: Updates automatically as you type.
* **Reading Time Estimation**: Calculates how long your note takes to read (based on a 200 wpm average).
* **Spell Checker**: Detects and lists misspelled words in a scrollable box, with a count badge showing how many errors were found. Markdown syntax, code blocks, URLs, and capitalised words (proper nouns) are automatically excluded from checking.
* **Theme Aware**: Automatically matches your Joplin theme (Light, Dark, Dracula, etc.) using native CSS variables.
* **Sync Status**: Displays a "Last Synced" timestamp so you know your metrics are current.

## Installation

### Via Joplin (Recommended)
1. Open Joplin and go to **Tools** > **Options** (or **Joplin** > **Settings** on macOS).
2. Click on **Plugins** in the left sidebar.
3. Search for `joplin-plugin-wordcount-by-developerzohaib`.
4. Click **Install** and restart Joplin.

### Manual Installation
1. Download the `.jpl` file from the [GitHub Releases](https://github.com/developerzohaib786/joplin-plugin-word-count/releases) page.
2. In Joplin, go to **Tools** > **Options** > **Plugins**.
3. Click the gear icon (top right) and select **Install from file**.
4. Select the downloaded `.jpl` file.

## How to Use

1. Once installed, a panel titled **Note Metrics** will appear automatically.
2. The panel shows:
   - **Words**: total word count of the current note.
   - **Reading Time**: estimated reading time in minutes.
   - **Misspelled Words**: a numbered, scrollable list of words not found in the English dictionary, with a total count badge.
3. To **show or hide** the panel, click the spell-check icon button in the **Note Toolbar** (top-right area of the editor).
4. To **reposition** the panel, go to **View** > **Change application layout**, drag the **Note Metrics** box to your preferred location (e.g., right sidebar or bottom panel), then click **Back**.

## Technical Summary

The plugin monitors your workspace for changes and note selections. It uses a robust regex to ensure that extra whitespace or empty lines do not inflate your word count.

* **Word Count Logic**: `note.body.split(/\s+/).length`
* **Reading Time**: `Math.ceil(wordCount / 200)`
* **Spell Check**: Uses `an-array-of-english-words` (~275k words) loaded into a `Set<string>` for fast O(1) lookups. Markdown syntax, fenced code blocks, inline code, URLs, image/link syntax, and capitalised words are stripped before checking. Duplicate words are deduplicated so each misspelling is shown only once.


## License

MIT © [developerzohaib](https://github.com/developerzohaib786)