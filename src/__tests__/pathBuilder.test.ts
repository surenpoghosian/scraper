import PathBuilderFactory from "../PathBuilderFactory";
import ListAm from "../PathBuilderFactory/products/ListAm";
import { ListAmCategory, ListAmCurrency, ListAmGeolocation, ListAmSellerType, PathBuilderVariant } from "../configs/types";

describe('ListAm', () => {
  let listAm: ListAm;

  beforeEach(() => {
    listAm = PathBuilderFactory.createPathBuilder(PathBuilderVariant.LISTAM) as ListAm;
    listAm.init('base-path');
  });

  test('should initialize with correct path', () => {
    expect(listAm.build()).toBe('base-path');
  });

  test('should build path with category', () => {
    listAm.init('base-path', ListAmCategory.ROOM_FOR_A_RENT);
    expect(listAm.build()).toBe('base-path/category/212');
  });

  test('should add and build path with currency', () => {
    listAm.addCurrency(ListAmCurrency.USD);
    expect(listAm.build()).toBe('base-path?crc=1');
  });

  test('should add and build path with geolocation', () => {
    listAm.addGeolocation(ListAmGeolocation.YEREVAN);
    expect(listAm.build()).toBe('base-path?n=1');
  });

  test('should add and build path with seller type', () => {
    listAm.addSellerType(ListAmSellerType.INDIVIDUAL);
    expect(listAm.build()).toBe('base-path?cmtype=1');
  });

  test('should add and build path with price range', () => {
    listAm.addPriceRange(1000, 2000);
    expect(listAm.build()).toBe('base-path?price1=1000&price2=2000');
  });

  test('should add multiple parameters', () => {
    listAm.addCurrency(ListAmCurrency.USD);
    listAm.addGeolocation(ListAmGeolocation.YEREVAN);
    expect(listAm.build()).toBe('base-path?crc=1&n=1');
  });

  test('should handle page number correctly', () => {
    listAm.addPageNumber(2);
    expect(listAm.build()).toBe('base-path/2');
  });

  test('should handle category and page number correctly', () => {
    listAm.init('base-path', ListAmCategory.ROOM_FOR_A_RENT);
    listAm.addPageNumber(2);
    expect(listAm.build()).toBe('base-path/category/212/2');
  });

  test('should handle parameters, category, and page number correctly', () => {
    listAm.init('base-path', ListAmCategory.ROOM_FOR_A_RENT);
    listAm.addCurrency(ListAmCurrency.USD);
    listAm.addPageNumber(2);
    expect(listAm.build()).toBe('base-path/category/212/2?crc=1');
  });

  test('should reset correctly', () => {
    listAm.addCurrency(ListAmCurrency.USD);
    listAm.addPageNumber(2);
    listAm.reset();
    expect(listAm.build()).toBe('base-path');
  });
});