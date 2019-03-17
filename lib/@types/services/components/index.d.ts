/// <reference types="react" />
import { Header, Footer, Carousel, ContactRow, AboutUsHome, NewsAndEvents, GalleryAndVideo, SpecialCarousel } from '../../components';
import * as resources from './resources';
/**
 *
 */
declare class ComponentsService {
    Types: LooseObject<string>;
    /***/
    getAllowedTypes(): string[];
    /***/
    getComponent(type: string): ((props: import("../../components/Faq/Faq").FaqProps) => JSX.Element) | typeof Header | typeof Footer | typeof Carousel | typeof ContactRow | typeof AboutUsHome | typeof NewsAndEvents | typeof GalleryAndVideo | typeof SpecialCarousel;
    /***/
    getComponentResource(type: string): typeof resources.faq;
    getForm(type: string): () => JSX.Element;
}
export default ComponentsService;
