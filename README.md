# Joplin Word Count & Reading Metrics

A lightweight, real-time statistics panel for Joplin. This plugin helps writers, students, and researchers track their progress by providing live word counts and estimated reading times directly within the Joplin interface.

## Features

* **Real-time Word Count**: Updates automatically as you type.
* **Reading Time Estimation**: Calculates how long your note takes to read (based on a 200 wpm average).
* **Theme Aware**: Automatically matches your Joplin theme (Light, Dark, Dracula, etc.) using native CSS variables.
* **Sync Status**: Displays a "Last Updated" timestamp so you know your metrics are current.

## Installation

### Via Joplin (Recommended)
1. Open Joplin and go to **Tools** > **Options** (or **Joplin** > **Settings** on macOS).
2. Click on **Plugins** in the left sidebar.
3. Search for `joplin-plugin-wordcount-by-developerzohaib`.
4. Click **Install** and restart Joplin.

### Manual Installation
1. Download the `.jpl` file from the [GitHub Releases](https://github.com/developerzohaib/joplin-plugin-word-count/releases) page.
2. In Joplin, go to **Tools** > **Options** > **Plugins**.
3. Click the gear icon (top right) and select **Install from file**.
4. Select the downloaded `.jpl` file.

## How to Use

1. Once installed, a new panel titled **Note Metrics** will appear.
2. To move it, go to **View** > **Change application layout**.
3. Drag the **Note Metrics** box to your preferred location (e.g., the right sidebar or bottom panel).
4. Click **Back** to save the layout.

## Technical Summary

The plugin monitors your workspace for changes and note selections. It uses a robust regex to ensure that extra whitespace or empty lines do not inflate your word count.

* **Word Count Logic**: `note.body.split(/\s+/).length`
* **Reading Time**: `Math.ceil(wordCount / 200)`

## License

MIT © [developerzohaib](https://github.com/developerzohaib786)