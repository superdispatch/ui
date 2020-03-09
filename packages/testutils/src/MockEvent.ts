import { act, fireEvent } from '@testing-library/react';

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

  static change(element: HTMLElement, text: string) {
    MockEvent.click(element);
    fireEvent.change(element, { target: { ...element, value: text } });
  }

  static changeAndBlur(element: HTMLElement, text: string) {
    MockEvent.change(element, text);
    fireEvent.blur(element, { target: { ...element, value: text } });
  }
}
