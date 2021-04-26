import { ReactNode } from 'react';

export interface ITextProps {
  children: string | ReactNode;
  className?: string;
}

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
  firstSectionImage: LooseObject;
  secondSectionTitle: string;
  secondSectionDescription: string;
  secondSectionBgColor: string;
  secondSectionImage: LooseObject;
  thirdSectionTitle: string;
  thirdSectionDescription: string;
  thirdSectionBgColor: string;
  thirdSectionImage: LooseObject;
  fourthSectionTitle: string;
  fourthSectionDescription: string;
  fourthSectionImage: LooseObject;
  fifthSectionTitle: string;
  fifthSectionDescription: string;
  fifthSectionItems: IListItem[];
  sixthSectionTitle: string;
  sixthSectionDescription: string;
  sixthSectionBgColor: string;
  sixthSectionImage: LooseObject;
}
