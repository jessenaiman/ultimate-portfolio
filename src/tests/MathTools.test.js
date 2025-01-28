import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import MathTools from '../components/Svelte/MathTools.svelte';

describe('MathTools Component', () => {
  it('renders successfully', () => {
    const { container } = render(MathTools);
    expect(container).toBeTruthy();
  });

  it('has calculator interface', () => {
    const { container } = render(MathTools);
    const calculator = container.querySelector('.calculator-container');
    expect(calculator).toBeTruthy();
  });

  it('has chart display', () => {
    const { container } = render(MathTools);
    const chart = container.querySelector('#mathChart');
    expect(chart).toBeTruthy();
  });

  it('has predefined equations section', () => {
    const { container } = render(MathTools);
    const equations = container.querySelector('.predefined-equations');
    expect(equations).toBeTruthy();
  });
});
