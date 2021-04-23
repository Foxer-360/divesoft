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
  secondSectionTitle: string;
  secondSectionDescription: string;
  secondSectionBgColor: string;
  thirdSectionTitle: string;
  thirdSectionDescription: string;
  thirdSectionBgColor: string;
  fourthSectionTitle: string;
  fourthSectionDescription: string;
  fifthSectionTitle: string;
  fifthSectionDescription: string;
  fifthSectionItems: IListItem[];
  sixthSectionTitle: string;
  sixthSectionDescription: string;
  sixthSectionBgColor: string;
}
