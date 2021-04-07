/**
 * Library definition file
 */
import * as React from 'react';

type LooseObject = Record<string, any>;

export class ComponentsService {
  getAllowedTypes(): string[];
  getComponent(type: string): typeof React.Component;
  getComponentResource(type: string): LooseObject;
  getForm(type: string): typeof React.Component;
}
