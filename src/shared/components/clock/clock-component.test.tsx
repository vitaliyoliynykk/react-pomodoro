import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import ClockComponent from './clock-component';
import { ClockComponentPropsType } from './clock-component-props.type';

describe('ClockComponent', () => {
  let params: ClockComponentPropsType;

  test("GIVEN time and max time where specified THEN time should be displayed in correct format 'xx:xx'", () => {
    params = {
      // Random current time between 1 and 1500
      currentTime: Math.floor(Math.random() * 1500) + 1,
      maxTime: 1500,
    };

    render(<ClockComponent {...params} />);
    const formattedTime = screen.getByTestId('formatted-time').textContent;

    const minutes = Math.floor(params.currentTime / 60).toString();
    const seconds = (params.currentTime % 60).toString();
    const expectedFormattedTime = `${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;

    expect(formattedTime).toBe(expectedFormattedTime);
  });

  test('GIVEN time and max time where specified THEN circle should be filled accordingly', () => {
    params = {
      // Random current time between 1 and 1500
      currentTime: Math.floor(Math.random() * 1500) + 1,
      maxTime: 1500,
    };

    render(<ClockComponent {...params} />);
    const clock = screen.getByTestId('clock');
    const style = window.getComputedStyle(clock);

    const expectedFill = `circle(${(params.currentTime / (params.maxTime / 100) / 2).toString()}%)`;

    expect(style.clipPath).toBe(expectedFill);
  });

  test('GIVEN specified color THEN clock background should have specified color', () => {
    params = {
      currentTime: 500,
      maxTime: 1500,
      color: 'rgb(255, 255, 255)',
    };

    render(<ClockComponent {...params} />);

    const background = screen.getByTestId('clock-background');
    const style = window.getComputedStyle(background);

    expect(style.backgroundColor).toBe(params.color);
  });

  test("GIVEN color isn't specified THEN clock background should be red", () => {
    params = {
      currentTime: 500,
      maxTime: 1500,
    };

    const defaultColor = 'rgb(163, 21, 59)';

    render(<ClockComponent {...params} />);

    const background = screen.getByTestId('clock-background');
    const style = window.getComputedStyle(background);

    expect(style.backgroundColor).toBe(defaultColor);
  });
});
