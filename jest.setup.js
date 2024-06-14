import { JSDOM } from 'jsdom';
import { TextEncoder, TextDecoder } from 'text-encoding';

const { window } = new JSDOM('<!doctype html><html><body></body></html>', {
  beforeParse (window) {
    window.TextEncoder = TextEncoder;
    window.TextDecoder = TextDecoder;
  }
});

global.window = window;
global.document = window.document;
