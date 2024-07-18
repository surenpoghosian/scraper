import { HTMLElement } from "node-html-parser";

export interface Scrapable {
  scraper: IScraper;
  scrape: (scrapeId: string, path: string, scrapeType: ScrapeType) => void;
}

export enum ScrapeType {
  ITEM,
  LIST,
}

export interface IScraper {
  get: (host: string, path: string) => Promise<string>;
  parse: (data: string) => HTMLElement;
  save: (data: any) => Promise<void>;
}

export enum ScraperType {
  HTTPS = "HTTPS",
  PUPPETTER = "PUPPETTER",
}

export interface IFetchOptions extends Omit<RequestInit, 'body'> {
  body?: BodyInit;
  headers?: Record<string, string>;
  isFormData?: boolean;
  isCache?: boolean;
  includeContentType?: boolean;
  timeout?: number;
  withoutLanguageHeader?: boolean;
  params?: Record<string, number | string | boolean>;
  path?: string;
}

export enum ScrapeableVariant {
  LISTAM = 'LISTAM',
  MOBILECENTRE = 'MOBILECENTRE',
}

export interface IBuilder {
  init: (path: string) => void;
  build: () => string;
  reset: () => void;
}

export enum PathBuilderVariant {
  LISTAM = 'LISTAM',
  MOBILECENTRE = 'MOBILECENTRE',
}

export enum ListAmCurrency {
  AMD = 'crc=0',
  USD = 'crc=1',
}

export enum ListAmGeolocation {
  YEREVAN = 'n=1',         // n=1 Yerevan
  AJAPNYAK = 'n=2',         // n=2 Yerevan/Ajapnyak
  ARABKIR = 'n=3',          // n=3 Yerevan/Arabkir
  AVAN = 'n=4',             // n=4 Yerevan/Avan
  DAVTASHEN = 'n=5',        // n=5 Yerevan/Davtashen
  EREBUNI = 'n=6',          // n=6 Yerevan/Erebuni
  QANAQER_ZEYTUN = 'n=7',   // n=7 Yerevan/Qanaqer Zeytun
  KENTRON = 'n=8',          // n=8 Yerevan/Kentron
  MALATIA_SEBASTIA = 'n=9', // n=9 Yerevan/Malatia Sebastia
  NOR_NORQ = 'n=10',        // n=10 Yerevan/Nor Norq
  NORQ_MARASH = 'n=11',     // n=11 Yerevan/Norq Marash
  NUBARASHEN = 'n=12',      // n=12 Yerevan/Nubarashen
  SHENGAVIT = 'n=13',       // n=13 Yerevan/Shengavit
}

export enum ListAmSellerType {
  AGENCY = 'cmtype=2',
  INDIVIDUAL = 'cmtype=1',
}

export enum ListAmCategory {
  PARKING_LOT_AND_GARAGE_RENT = '175',
  ROOM_FOR_A_RENT = '212',
}
