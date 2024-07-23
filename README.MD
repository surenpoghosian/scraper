# Scraper Project

## Overview

The Scraper project is designed to demonstrate the practical implementation of various design patterns, including Factory, Builder, and Singleton. This project features a web scraper that periodically scrapes specified web pages based on a given interval (cron expression). The scraper is highly modular and extensible, making it easy to adapt to different web scraping needs.

## Features

- **Factory Design Pattern**: Used to create different types of scrapers based on the target website.
- **Builder Design Pattern**: Facilitates the construction of complex scrape URL paths.
- **Singleton Design Pattern**: Ensures that the db connection is a single instance, managing the storing tasks.
- **Scheduler**: Configured with cron expressions to scrape web pages at specified intervals.
- **Extensible and Modular**: Easy to add new scrapers and extend functionality.

## Project Structure

```
scraper/
├── src
│   ├── PathBuilderFactory
│   │   ├── index.ts
│   │   └── products
│   │       ├── ListAm.ts
│   │       └── MobileCentre.ts
│   ├── Scheduler
│   │   └── index.ts
│   ├── ScrapableFactory
│   │   ├── index.ts
│   │   └── products
│   │       ├── ListAm.ts
│   │       └── MobileCentre.ts
│   ├── ScrapeValidatorFactory
│   │   ├── index.ts
│   │   └── products
│   │       ├── ListAm.ts
│   │       └── MobileCentre.ts
│   ├── ScrapersFactory
│   │   ├── index.ts
│   │   └── products
│   │       ├── Https.ts
│   │       └── Puppetter.ts
│   ├── __tests__
│   │   └── pathBuilder.test.ts
│   ├── configs
│   │   ├── constants.ts
│   │   └── types.ts
│   ├── db
│   │   ├── MongoCRUD.ts
│   │   └── MongoDBConnection.ts
│   ├── index.ts
│   └── utils
│       ├── getDateTime.ts
│       ├── getRandomInterval.ts
│       ├── request.ts
│       └── sleep.ts
├── tsconfig.json
├── README.MD
├── eslint.config.mjs
├── jest.config.cjs
├── package-lock.json
└── package.json

15 directories, 29 files
```

## Getting Started

### Prerequisites

- Node.js
- typescript
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/surenpoghosian/scraper.git
   cd scraper
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Configuration

Configure the scraper using the `PathBuilderFactory` to set the target URLs.

### Usage

1. Build and run the project:
   ```bash
   npm run build
   npm start
   ```

2. The scheduler will start and scrape the specified web pages based on the configured cron expressions.

## Example Code

Here's how to run the scraper:

```typescript
import { v4 as uuid } from 'uuid';
import ScrapersFactory from './ScrapersFactory';
import ScrapableFactory from './ScrapableFactory';
import PathBuilderFactory from './PathBuilderFactory';
import { ListAmCategory, ListAmGeolocation, PathBuilderVariant, ScrapeValidatorVariant } from "./configs/types";
import { ScrapeableVariant, ScraperType, ScrapeType } from "./configs/types";
import { ListAmBaseURL } from './configs/constants';
import { sleep } from "./utils/sleep";
import ScrapeValidatorFactory from './ScrapeValidatorFactory';
import getRandomInterval from './utils/getRandomInterval';

class Main {
  run = async () => {
    const scraperFactory = ScrapersFactory;
    const scrapableFactory = ScrapableFactory;
    const pathBuilderFactory = PathBuilderFactory;
    const scrapeValidatorFactory = ScrapeValidatorFactory;

    const scraper = scraperFactory.createScraper(ScraperType.PUPPETTER);
    const validator = scrapeValidatorFactory.createScrapeValidator(ScrapeValidatorVariant.LISTAM);
    const scrapable = scrapableFactory.createScrapable(ScrapeableVariant.LISTAM, scraper, validator);
    const pathBuilder = pathBuilderFactory.createPathBuilder(PathBuilderVariant.LISTAM);

    pathBuilder.init('', ListAmCategory.ROOM_FOR_A_RENT);

    const scrapeId = uuid();

    for (let i = 1; true; i++) {
      pathBuilder.reset();
      pathBuilder.addPageNumber(i);
      pathBuilder.addGeolocation(ListAmGeolocation.YEREVAN);

      const finalPath = pathBuilder.build();
      console.log(`${ListAmBaseURL}${finalPath}`);

      await scrapable.scrape(scrapeId, finalPath, ScrapeType.LIST);

      const sleepInterval = getRandomInterval(4000, 10000);
      await sleep(sleepInterval);
    }
  }
};

export default Main;
```

## Design Patterns in Use

### Factory Pattern

The `ScrapersFactory` is responsible for creating instances of different types of scrapers based on the scraper engine that you need.

Example:
```typescript
const scraper = ScrapersFactory.createScraper(ScraperType.PUPPETTER);
```

### Builder Pattern

The `PathBuilderFactory` is used to construct complex scrape URL paths.

Example:
```typescript
const pathBuilder = PathBuilderFactory.createPathBuilder(PathBuilderVariant.LISTAM);
pathBuilder.init('', ListAmCategory.ROOM_FOR_A_RENT);
pathBuilder.addPageNumber(1);
pathBuilder.addGeolocation(ListAmGeolocation.YEREVAN);
const finalPath = pathBuilder.build();
console.log(finalPath);
```

### Singleton Pattern

The `MongoDBConnection` class is implemented as a singleton to ensure that there is only one instance managing the MongoDB connection.

Example:
```typescript
const mongoConnection = await MongoDBConnection.getInstance();
const db = mongoConnection.getDb();
// Use db as needed
```

## Extending the Project

### Adding a New Scraper

1. Create a new scrapable product in the `scrapableFactory/` directory that extends `Scrapable`.
2. Implement the required methods.
3. Register the new scrapable in the `scrapableFactory`.

### Contributing

Contributions are welcome! Please submit a pull request or open an issue to discuss your ideas.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Happy Scraping!