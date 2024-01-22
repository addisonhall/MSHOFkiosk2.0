import type { Schema, Attribute } from '@strapi/strapi';

export interface ComponentsHighlights extends Schema.Component {
  collectionName: 'components_components_highlights';
  info: {
    displayName: 'Highlights';
    description: '';
  };
  attributes: {
    name: Attribute.String;
    video: Attribute.Media;
    videoLink: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'components.highlights': ComponentsHighlights;
    }
  }
}
