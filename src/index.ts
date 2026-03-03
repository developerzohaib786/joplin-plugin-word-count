import joplin from 'api';
import { ToolbarButtonLocation } from 'api/types';
import getMisspelledWords  from './SpellingCheckFunc';


joplin.plugins.register({
    onStart: async function () {
        const panel = await joplin.views.panels.create('stats_panel');

        await joplin.commands.register({
            name: 'toggleStatsPanel',
            label: 'Toggle Note Stats & Spell Check',
            iconName: 'fas fa-spell-check',
            execute: async () => {
                const isVisible = await joplin.views.panels.visible(panel);
                if (isVisible) {
                    await joplin.views.panels.hide(panel);
                } else {
                    await joplin.views.panels.show(panel);
                }
            },
        });

        await joplin.views.toolbarButtons.create(
            'toggleStatsPanelBtn',
            'toggleStatsPanel',
            ToolbarButtonLocation.NoteToolbar
        );

        async function updateStats() {
            const note = await joplin.workspace.selectedNote();

            if (note) {
                const wordCount = note.body.trim() ? note.body.split(/\s+/).length : 0;
                const readingTime = Math.ceil(wordCount / 200);
                const lastUpdated = new Date().toLocaleTimeString();
                const misspelled = getMisspelledWords(note.body);

                const misspelledCount = misspelled.length;
                const misspelledHtml = misspelledCount > 0
                    ? misspelled.map((w, i) => `<div class="misspelled-item"><span class="misspelled-index">${i + 1}.</span><span class="misspelled-word">${w}</span></div>`).join('')
                    : '<div class="no-errors">✓ No misspelled words found</div>';

                await joplin.views.panels.setHtml(panel, `
                    <style>
                        :root {
                            --padding: 16px;
                        }
                        .stats-container {
                            padding: var(--padding);
                            background-color: var(--joplin-background-color);
                            color: var(--joplin-color);
                            font-family: var(--joplin-font-family);
                            font-size: var(--joplin-font-size);
                            min-height: 100vh;
                        }
                        .stats-header {
                            text-transform: uppercase;
                            font-weight: bold;
                            opacity: 0.6;
                            margin-bottom: 12px;
                            border-bottom: 1px solid var(--joplin-divider-color);
                            padding-bottom: 4px;
                            font-size: 0.8em;
                        }
                        .stat-item {
                            display: flex;
                            justify-content: space-between;
                            margin-bottom: 8px;
                        }
                        .stat-value {
                            color: var(--joplin-color-accent);
                            font-weight: bold;
                        }
                        .section {
                            margin-top: 20px;
                        }
                        .misspelled-box {
                            margin-top: 8px;
                            border: 1px solid rgba(220, 50, 50, 0.35);
                            border-radius: 6px;
                            background-color: rgba(220, 50, 50, 0.05);
                            max-height: 220px;
                            overflow-y: auto;
                            padding: 6px 4px;
                        }
                        .misspelled-box::-webkit-scrollbar {
                            width: 5px;
                        }
                        .misspelled-box::-webkit-scrollbar-thumb {
                            background: rgba(220, 50, 50, 0.3);
                            border-radius: 3px;
                        }
                        .misspelled-item {
                            display: flex;
                            align-items: baseline;
                            gap: 6px;
                            padding: 3px 8px;
                            border-radius: 4px;
                        }
                        .misspelled-item:hover {
                            background-color: rgba(220, 50, 50, 0.1);
                        }
                        .misspelled-index {
                            font-size: 0.75em;
                            opacity: 0.5;
                            min-width: 18px;
                            text-align: right;
                        }
                        .misspelled-word {
                            color: #e05555;
                            font-weight: 500;
                            font-size: 0.9em;
                            text-decoration: underline wavy #e05555;
                        }
                        .misspelled-count {
                            font-size: 0.75em;
                            opacity: 0.55;
                            margin-left: 4px;
                            font-weight: normal;
                        }
                        .no-errors {
                            color: #4caf50;
                            font-size: 0.85em;
                            font-style: italic;
                            padding: 4px 8px;
                        }
                        .footer {
                            margin-top: 20px;
                            font-size: 0.7em;
                            opacity: 0.4;
                            font-style: italic;
                        }
                    </style>

                    <div class="stats-container">
                        <div class="stats-header">Note Metrics</div>
                        <div class="stat-item">
                            <span>Words:</span>
                            <span class="stat-value">${wordCount}</span>
                        </div>
                        <div class="stat-item">
                            <span>Reading Time:</span>
                            <span class="stat-value">${readingTime} min</span>
                        </div>

                        <div class="section">
                            <div class="stats-header">Misspelled Words <span class="misspelled-count">${misspelledCount > 0 ? `(${misspelledCount})` : ''}</span></div>
                            <div class="misspelled-box">${misspelledHtml}</div>
                        </div>

                        <div class="footer">
                            Last synced: ${lastUpdated}
                        </div>
                    </div>
                `);
            }
        }

        await joplin.workspace.onNoteChange(async () => {
            await updateStats();
        });

        await joplin.workspace.onNoteSelectionChange(async () => {
            await updateStats();
        });

        updateStats();
    },
});