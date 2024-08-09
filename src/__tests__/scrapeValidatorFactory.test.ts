import ScrapeValidatorFactory from '../ScrapeValidatorFactory';
import ListAm from '../ScrapeValidatorFactory/products/ListAm'
import MobileCentre from '../ScrapeValidatorFactory/products/MobileCentre';
import { ScrapeValidatorVariant } from "../configs/types";
import parse, { HTMLElement } from 'node-html-parser';
import { ScrapeType } from '../configs/types';

describe("ScrapeValidatorFactory", () => {
  it("should create a ListAm validator when ScrapeValidatorVariant.LISTAM is provided", () => {
    const validator = ScrapeValidatorFactory.createScrapeValidator(ScrapeValidatorVariant.LISTAM);
    expect(validator).toBeInstanceOf(ListAm);
  });

  it("should create a MobileCentre validator when ScrapeValidatorVariant.MOBILECENTRE is provided", () => {
    const validator = ScrapeValidatorFactory.createScrapeValidator(ScrapeValidatorVariant.MOBILECENTRE);
    expect(validator).toBeInstanceOf(MobileCentre);
  });

  it("should throw an error when an unsupported ScrapeValidatorVariant is provided", () => {
    expect(() => {
      ScrapeValidatorFactory.createScrapeValidator("UNSUPPORTED_TYPE" as unknown as ScrapeValidatorVariant);
    }).toThrowError("Unsupported scrape type: UNSUPPORTED_TYPE");
});});

describe("ListAm", () => {
  const listAmValidator = new ListAm();

  it("should return false if the HTML does not contain elements with class '.gl' when ScrapeType.LIST is used", () => {
    const htmlContent = `<div class="no-gl"></div>`;
    const root = parse(htmlContent) as HTMLElement;

    const isValid = listAmValidator.validate(root, ScrapeType.LIST);
    expect(isValid).toBe(false);
  });

  it("should return true if the HTML contains elements with class '.gl' when ScrapeType.LIST is used", () => {
    const htmlContent = `<div class="gl"></div>`;
    const root = parse(htmlContent) as HTMLElement;

    const isValid = listAmValidator.validate(root, ScrapeType.LIST);
    expect(isValid).toBe(true);
  });

  it("should throw an error if ScrapeType.ITEM is used", () => {
    const htmlContent = `<div class="item"></div>`;
    const root = parse(htmlContent) as HTMLElement;

    expect(() => {
      listAmValidator.validate(root, ScrapeType.ITEM);
    }).toThrowError("ScrapeType.ITEM validator logic is not implemented!");
  });
});