import cron from 'node-cron';
import ScraperScheduler from '../Scheduler';
import Main from '../main';

jest.mock('node-cron', () => ({
  schedule: jest.fn(),
}));

jest.mock('../main', () => {
  return jest.fn().mockImplementation(() => {
    return { run: jest.fn().mockResolvedValue(undefined) };
  });
});

describe('ScraperScheduler', () => {
  const cronExpression = '*/5 * * * *'; // Every 5 minutes
  let scheduler: ScraperScheduler;

  beforeEach(() => {
    scheduler = new ScraperScheduler(cronExpression);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with a given cron expression', () => {
    expect((scheduler as any).cronExpression).toBe(cronExpression);
    expect((scheduler as any).task).toBeNull();
  });

  it('should start the scheduler and set up a cron job', () => {
    const scheduleMock = cron.schedule as jest.Mock;
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();

    scheduler.start();

    expect(scheduleMock).toHaveBeenCalledWith(
      cronExpression,
      expect.any(Function)
    );
    expect(consoleLogSpy).toHaveBeenCalledWith(
      `Scheduler started with cron expression: ${cronExpression}`
    );

    scheduleMock.mockRestore();
    consoleLogSpy.mockRestore();
  });

  it('should call the scrape method when the cron job is triggered', async () => {
    const scheduleMock = cron.schedule as jest.Mock;
    const scrapeSpy = jest.spyOn(scheduler, 'scrape').mockResolvedValue(undefined);
    
    // Mock the cron.schedule to directly call the provided function
    scheduleMock.mockImplementation((_, callback) => {
      callback();
      return { stop: jest.fn() };
    });

    await scheduler.start(); // Ensure `start` is awaited for asynchronous handling

    expect(scrapeSpy).toHaveBeenCalled();

    scheduleMock.mockRestore();
    scrapeSpy.mockRestore();
  });

  it('should stop the scheduled cron job', () => {
    const stopMock = jest.fn();
    (scheduler as any).task = { stop: stopMock };

    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();

    scheduler.stop();

    expect(stopMock).toHaveBeenCalled();
    expect(consoleLogSpy).toHaveBeenCalledWith('Scheduler stopped.');

    stopMock.mockRestore();
    consoleLogSpy.mockRestore();
  });

  it('should do nothing if stop is called when no task is scheduled', () => {
    const stopMock = jest.fn();

    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();

    scheduler.stop();

    expect(stopMock).not.toHaveBeenCalled();
    expect(consoleLogSpy).not.toHaveBeenCalled();

    consoleLogSpy.mockRestore();
  });

  it('should handle errors in the scrape method gracefully', async () => {
    const scheduleMock = cron.schedule as jest.Mock;
    const error = new Error('Scraping error');
    const scrapeSpy = jest.spyOn(scheduler, 'scrape').mockRejectedValue(error);
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

    scheduleMock.mockImplementation((_, callback) => {
      callback();
      return { stop: jest.fn() };
    });

    await scheduler.start(); // Ensure `start` is awaited for asynchronous handling

    await new Promise((resolve) => setImmediate(resolve)); // Allow time for async operations

    expect(consoleErrorSpy).toHaveBeenCalledWith('Error during scraping:', error);

    scheduleMock.mockRestore();
    scrapeSpy.mockRestore();
    consoleErrorSpy.mockRestore();
  });
});