import { act, fireEvent } from '@testing-library/react';

const keyCodes = new Map([
  ['Enter', 13],
  ['Escape', 27],
]);

export class MockEvent {
  static focus(element: HTMLElement): void {
    act(() => {
      element.focus();
    });
  }

  static click(element: HTMLElement) {
    MockEvent.focus(element);

    const href = element.getAttribute('href');

    act(() => {
      if (href) {
        element.removeAttribute('href');
      }

      element.click();

      if (href) {
        element.setAttribute('href', href);
      }
    });
  }

  static keyPress(element: HTMLElement, key: 'Enter' | 'Escape') {
    MockEvent.click(element);
    fireEvent.keyPress(element, { key, keyCode: keyCodes.get(key) });
  }

  static change(element: HTMLElement, text: string) {
    MockEvent.click(element);
    fireEvent.change(element, { target: { ...element, value: text } });
  }

  static changeAndBlur(element: HTMLElement, text: string) {
    MockEvent.change(element, text);
    fireEvent.blur(element, { target: { ...element, value: text } });
  }

  static changeFile(element: HTMLElement, file: File) {
    MockEvent.click(element);
    fireEvent.change(element, { target: { ...element, files: [file] } });
  }

  static changeFileAndBlur(element: HTMLElement, file: File) {
    MockEvent.changeFile(element, file);
    fireEvent.blur(element, { target: { ...element, files: [file] } });
  }
}
