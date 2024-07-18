import { IBuilder, ListAmCategory, ListAmCurrency, ListAmGeolocation, ListAmSellerType } from "../../configs/types";

/**
 * Class to build paths for ListAm.
 */
class ListAm implements IBuilder {
  public path: string;
  private category?: ListAmCategory;
  private parameters: string[];
  private pageNumber: number;

  /**
   * Constructs a new instance of ListAm Path Builder.
   * @param path - The initial path.
   */
  init(path: string, category?: ListAmCategory) {
    this.path = path;
    this.category = category;
    this.parameters = [];
    this.pageNumber = 1;
  }

  /**
   * Gets the current path.
   * @returns The current path.
   */
  build() {
    const categoryPath = this.category ? `/category/${this.category}` : '';
    const pagePath = this.pageNumber > 1 ? `/${this.pageNumber}` : '';
    const params = this.parameters.length > 0 ? `?${this.parameters.join('&')}` : '';
    return `${this.path}${categoryPath}${pagePath}${params}`;
  };

  /**
   * Resets the current path to an empty string.
   */
  reset() {
    this.parameters = [];
    this.pageNumber = 1;
  };

  /**
   * Sets the page number.
   * @param pageNumber - The page number to set.
   */
  addPageNumber(pageNumber: number) {
    this.pageNumber = pageNumber;
  }

  /**
   * Adds currency to the path.
   * @param currency - The currency to add.
   */
  addCurrency(currency: ListAmCurrency) {
    this.addParameter(`${currency}`);
  }

  /**
   * Adds geolocation to the path.
   * @param geolocation - The geolocation to add.
   */
  addGeolocation(geolocation: ListAmGeolocation) {
    this.addParameter(`${geolocation}`);
  }

  /**
   * Adds seller type to the path.
   * @param type - The seller type to add.
   */
  addSellerType(type: ListAmSellerType) {
    this.addParameter(`${type}`);
  }

  /**
   * Adds a price range to the path.
   * @param from - The minimum price.
   * @param to - The maximum price.
   */
  addPriceRange(from: number, to: number) {
    this.addParameter(`price1=${from}&price2=${to}`);
  }

  /**
   * Adds a parameter to the path.
   * @param param - The parameter to add.
   */
  private addParameter(param: string) {
    this.parameters.push(param);
  }
};

export default ListAm;
