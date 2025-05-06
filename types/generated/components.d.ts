import type { Schema, Struct } from '@strapi/strapi';

export interface ContentCallToAction extends Struct.ComponentSchema {
  collectionName: 'components_content_call_to_actions';
  info: {
    displayName: 'Call to Action';
  };
  attributes: {
    buttonLabel: Schema.Attribute.String & Schema.Attribute.Required;
    buttonUrl: Schema.Attribute.String & Schema.Attribute.Required;
    text: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ContentHeadingBlock extends Struct.ComponentSchema {
  collectionName: 'components_content_heading_blocks';
  info: {
    displayName: 'Sub Heading';
  };
  attributes: {
    level: Schema.Attribute.Enumeration<['h3', 'h4']> &
      Schema.Attribute.DefaultTo<'h3'>;
    text: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ContentImageBlock extends Struct.ComponentSchema {
  collectionName: 'components_content_image_blocks';
  info: {
    displayName: 'Image / Infographic';
  };
  attributes: {
    altText: Schema.Attribute.String & Schema.Attribute.Required;
    image: Schema.Attribute.Media & Schema.Attribute.Required;
  };
}

export interface ContentParagraph extends Struct.ComponentSchema {
  collectionName: 'components_content_paragraphs';
  info: {
    displayName: 'Paragraph';
  };
  attributes: {
    text: Schema.Attribute.RichText & Schema.Attribute.Required;
  };
}

export interface ContentQuoteBlock extends Struct.ComponentSchema {
  collectionName: 'components_content_quote_blocks';
  info: {
    displayName: 'Quote Block';
  };
  attributes: {
    quote: Schema.Attribute.Text & Schema.Attribute.Required;
    source: Schema.Attribute.String;
  };
}

export interface ContentTableOfContents extends Struct.ComponentSchema {
  collectionName: 'components_content_toc';
  info: {
    displayName: 'Table of Contents';
  };
  attributes: {
    autoGenerate: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
  };
}

export interface ContentVideoBlock extends Struct.ComponentSchema {
  collectionName: 'components_content_video_blocks';
  info: {
    displayName: 'Video Embed';
  };
  attributes: {
    provider: Schema.Attribute.Enumeration<['youtube', 'vimeo', 'other']> &
      Schema.Attribute.DefaultTo<'youtube'>;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ElementsMetric extends Struct.ComponentSchema {
  collectionName: 'components_elements_metrics';
  info: {
    description: 'Key performance metrics';
    displayName: 'Metric';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    prefix: Schema.Attribute.String;
    suffix: Schema.Attribute.String;
    value: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ElementsTag extends Struct.ComponentSchema {
  collectionName: 'components_elements_tags';
  info: {
    description: 'Tags for categorizing content';
    displayName: 'Tag';
  };
  attributes: {
    color: Schema.Attribute.Enumeration<
      ['blue', 'green', 'red', 'yellow', 'purple', 'gray']
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'blue'>;
    name: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedMedia extends Struct.ComponentSchema {
  collectionName: 'components_shared_media';
  info: {
    displayName: 'Media';
    icon: 'file-video';
  };
  attributes: {
    file: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
  };
}

export interface SharedQuote extends Struct.ComponentSchema {
  collectionName: 'components_shared_quotes';
  info: {
    displayName: 'Quote';
    icon: 'indent';
  };
  attributes: {
    body: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SharedRichText extends Struct.ComponentSchema {
  collectionName: 'components_shared_rich_texts';
  info: {
    description: '';
    displayName: 'Rich text';
    icon: 'align-justify';
  };
  attributes: {
    body: Schema.Attribute.RichText;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seo';
  info: {
    displayName: 'SEO Meta';
  };
  attributes: {
    canonicalUrl: Schema.Attribute.String & Schema.Attribute.Required;
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    metaImage: Schema.Attribute.Media & Schema.Attribute.Required;
    metaRobots: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'index, follow'>;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
    structuredData: Schema.Attribute.JSON;
  };
}

export interface SharedSlider extends Struct.ComponentSchema {
  collectionName: 'components_shared_sliders';
  info: {
    description: '';
    displayName: 'Slider';
    icon: 'address-book';
  };
  attributes: {
    files: Schema.Attribute.Media<'images', true>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'content.call-to-action': ContentCallToAction;
      'content.heading-block': ContentHeadingBlock;
      'content.image-block': ContentImageBlock;
      'content.paragraph': ContentParagraph;
      'content.quote-block': ContentQuoteBlock;
      'content.table-of-contents': ContentTableOfContents;
      'content.video-block': ContentVideoBlock;
      'elements.metric': ElementsMetric;
      'elements.tag': ElementsTag;
      'shared.media': SharedMedia;
      'shared.quote': SharedQuote;
      'shared.rich-text': SharedRichText;
      'shared.seo': SharedSeo;
      'shared.slider': SharedSlider;
    }
  }
}
