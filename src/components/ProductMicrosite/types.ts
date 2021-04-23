export interface IListItem {
  title: string;
  description: string;
}

export interface IProductMicrositeData {
  productName: string;
  productPrice: string;
  productUrl: string;
  firstSectionTitle: string;
  firstSectionDescription: string;
  secondSectionTitle: string;
  secondSectionDescription: string;
  thirdSectionTitle: string;
  thirdSectionDescription: string;
  fourthSectionTitle: string;
  fourthSectionDescription: string;
  fifthSectionTitle: string;
  fifthSectionDescription: string;
  fifthSectionItems: IListItem[];
  sixthSectionTitle: string;
  sixthSectionDescription: string;
}
