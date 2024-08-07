import cron from 'node-cron';
import Main from '../main';

class ScraperScheduler {
  private cronExpression: string;
  private task: cron.ScheduledTask | null = null;

  constructor(
    cronExpression: string
  ) {
    this.cronExpression = cronExpression;
  }

  async scrape(): Promise<void> {
    console.log("Waking up to scrape...");

    const main = new Main();
    await main.run();

    console.log("Scraping done. Going back to sleep.");
  }

  start(): void {
    this.task = cron.schedule(this.cronExpression, () => {
      console.log('cron triggered');
      this.scrape().catch((error) => {
        console.error("Error during scraping:", error);
      });
    });

    console.log(`Scheduler started with cron expression: ${this.cronExpression}`);
  }

  stop(): void {
    if (this.task) {
      this.task.stop();
      console.log("Scheduler stopped.");
    }
  }
}

// Configuration and initialization
// const cronExpression = '0 */12 * * *'; // Every 12 hours
const cronExpression = '*/5 * * * *'; // Every 5 minutes
// const cronExpression = '* * * * *'; // Every minute

const scheduler = new ScraperScheduler(
  cronExpression
);

// Start the scheduler
scheduler.start();

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log("Received SIGINT. Gracefully shutting down.");
  scheduler.stop();
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log("Received SIGTERM. Gracefully shutting down.");
  scheduler.stop();
  process.exit(0);
});

export default ScraperScheduler;
