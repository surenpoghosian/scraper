import { PathBuilderVariant } from "../configs/types";
import ListAm from "./products/ListAm";
import MobileCentre from "./products/MobileCentre";

class PathBuilderFactory {
  static createPathBuilder(type: PathBuilderVariant) {
    switch (type) {
      case PathBuilderVariant.LISTAM:
        return new ListAm();
      case PathBuilderVariant.MOBILECENTRE:
        return new MobileCentre();
      default:
        throw new Error(`Unsupported scrape type: ${type}`);
    }
  }
};

export default PathBuilderFactory;
