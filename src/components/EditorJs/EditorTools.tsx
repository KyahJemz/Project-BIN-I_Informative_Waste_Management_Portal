
import Marker from '@editorjs/marker';
import InlineCode from '@editorjs/inline-code';
import Underline from '@editorjs/underline';

import Delimiter from '@editorjs/delimiter';
import Quote from '@editorjs/quote';
import Header from '@editorjs/header';
import Paragraph from '@editorjs/paragraph';
import Code from '@editorjs/code';

import Image from '@editorjs/image';
import Embed from '@/class/editor.js-embed';
import SimpleImage from '@editorjs/simple-image';
import Link from '@editorjs/link';

import List from '@editorjs/list';
import NestedList from '@editorjs/nested-list';
import CheckList from '@editorjs/checklist';

import Table from '@editorjs/table';
import TextVariantTune from '@editorjs/text-variant-tune';
import { env } from '@/env.mjs';
import { useAuthorizationStore } from '@/stores/useAuthorizationStore';

const codeConfig = {
	class: Code,
	config: {
		placeholder: 'Enter your code here...', // Placeholder text for the code block
	},
};

const headerConfig = {
	class: Header,
	config: {
		inlineToolbar: true,
		placeholder: 'Enter a Header', // Placeholder text when adding a new header
		levels: [2, 3, 4, 5], // Levels of headers available, e.g., H2, H3, H4, H5
		defaultLevel: 2, // Default header level (e.g., H2)
	}, // Applies text variant tune for styling headers
};

const paragraphConfig = {
	class: Paragraph,
	inlineToolbar: true, // Enable inline toolbar for quick formatting options
	config: {
		placeholder: 'Write something...', // Placeholder text for the paragraph
	}, // Applies text variant tune for styling paragraphs
};

const checklistConfig = {
	class: CheckList,
	config: {
		placeholder: 'Add a task...', // Placeholder text for checklist items
	},
};

const embedConfig = {
	class: Embed,
	config: {
		services: {
			youtube: true,
			twitter: true, 
			instagram: true,
		},
	},
};


const imageConfig = {
  class: Image,
  config: {
    endpoints: {
      byFile: env.NEXT_PUBLIC_API_BASE_URL + '/upload', 
    },
    captionPlaceholder: 'Add a caption...',
    buttonContent: 'Select an image', 
    additionalRequestHeaders: {         
      Authorization: `Bearer ${localStorage.getItem("authorization")}`,
    },
    additionalRequestData: {
      category: 'editorjs',
      id: new Date().toISOString().replace(/[:.]/g, '_'),
    },
    field: 'image', 
    types: 'image/*',
  },
};
const inlineCodeConfig = {
	class: InlineCode,
	config: {
		shortcut: 'CMD+SHIFT+C', // Shortcut for adding inline code
	},
};

const linkConfig = {
	class: Link,
	// config: {
	//   endpoint: 'http://localhost:8008/fetchUrl', // Backend endpoint to validate and process URLs
	// },
};

const listConfig = {
	class: List,
	config: {
		defaultStyle: 'unordered', // Default list style (ordered or unordered)
	},
};

const quoteConfig = {
	class: Quote,
	config: {
		placeholder: 'Enter a quote...', // Placeholder text for the quote block
		align: 'center', // Default alignment of the quote text
	}, // Applies text variant tune for styling quotes
};

const simpleImageConfig = {
	class: SimpleImage,
	config: {
		placeholder: 'Select an image...', // Placeholder text when no image is selected
	},
};

const delimiterConfig = {
	class: Delimiter,
};

const markerConfig = {
	class: Marker,
	config: {
		shortcut: 'CMD+SHIFT+M', // Shortcut for highlighting text
	},
};

const underlineConfig = {
	class: Underline,
	config: {
		shortcut: 'CMD+SHIFT+U', // Shortcut for underlining text
	},
};

const nestedListConfig = {
	class: NestedList,
	config: {
		defaultStyle: 'unordered', // Default list style for nested lists
	},
};

const tableConfig = {
	class: Table,
	config: {
		inlineToolbar: true,
		rows: 3, // Default number of rows in the table
		cols: 3, // Default number of columns in the table
		withHeadings: true, // Include column headings by default
	},
};

const textVariantTuneConfig = {
	class: TextVariantTune,
	config: {
		styles: ['bold', 'italic', 'underline'], // Available text styles for tuning
	},
};

export const EDITOR_TOOLS = {
	code: codeConfig,
	header: headerConfig,
	paragraph: paragraphConfig,
	checklist: checklistConfig,
	embed: embedConfig,
	image: imageConfig,
	inlineCode: inlineCodeConfig,
	link: linkConfig,
	list: listConfig,
	quote: quoteConfig,
	simpleImage: simpleImageConfig,
	delimiter: delimiterConfig,
	marker: markerConfig,
	underline: underlineConfig,
	nestedList: nestedListConfig,
	table: tableConfig,
	textVariantTune: textVariantTuneConfig,
};
