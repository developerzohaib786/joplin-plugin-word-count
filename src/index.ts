import joplin from 'api';

joplin.plugins.register({
    onStart: async function() {
        // 1. Create the panel
        const panel = await joplin.views.panels.create('stats_panel');

        // 2. Define the update function
        async function updateStats() {
            const note = await joplin.workspace.selectedNote();
            
            if (note) {
                // Improved Regex: Counts words and ignores extra whitespace
                const wordCount = note.body.trim() ? note.body.split(/\s+/).length : 0;
                const readingTime = Math.ceil(wordCount / 200);
                const lastUpdated = new Date().toLocaleTimeString();

                // 3. Set HTML with Native Joplin Styling
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
                            height: 100vh;
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
                        <div class="footer">
                            Syncing: ${lastUpdated}
                        </div>
                    </div>
                `);
            }
        }

        // 4. Register Listeners for Real-Time Updates
        // Note: onNoteChange triggers as you type (saved to DB)
        await joplin.workspace.onNoteChange(async () => {
            await updateStats();
        });

        // Triggers when you click a different note
        await joplin.workspace.onNoteSelectionChange(async () => {
            await updateStats();
        });

        // 5. Initial Run
        updateStats();
    },
});