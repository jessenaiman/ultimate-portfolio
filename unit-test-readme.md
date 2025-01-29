# Unit Testing Guide

This project uses Vitest as the primary testing framework along with testing-library for component testing. The tests are organized to cover React, Svelte, and Vue components, as well as utility functions.

## Running Tests

To run the tests, use one of the following commands:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

## Test Coverage

Test coverage reports are generated in HTML, text, and JSON formats. You can find the coverage reports in the following locations:
- HTML report: `coverage/index.html`
- JSON report: `coverage/coverage-final.json`

Coverage is configured to exclude:
- `node_modules/`
- `src/test/`

## Testing Structure

### 1. Component Tests
Component tests are located in `__tests__` directories adjacent to the components they test. This keeps tests close to their implementation and makes them easy to find.

Example structure:
```
src/
  components/
    ui/
      __tests__/
        Header.test.tsx
      Header.tsx
```

### 2. Framework-Specific Tests
- React components: Use `@testing-library/react`
- Svelte components: Use `@testing-library/svelte`
- Vue components: Use `@testing-library/vue`

### 3. Test Patterns

#### React Components
```typescript
import { render, screen, fireEvent } from '@testing-library/react';

describe('Component', () => {
  // Setup (if needed)
  beforeEach(() => {
    // Common setup
  });

  it('should render correctly', () => {
    render(<Component />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should handle user interactions', () => {
    render(<Component />);
    fireEvent.click(screen.getByRole('button'));
    expect(/* result */).toBe(/* expected */);
  });
});
```

#### Svelte Components
```typescript
import { render, fireEvent } from '@testing-library/svelte';

describe('Component', () => {
  it('should render correctly', () => {
    const { container } = render(Component);
    expect(container.querySelector('.class')).toBeTruthy();
  });
});
```

### 4. Mocking
For components that require browser APIs or external services, use Vitest's mocking capabilities:

```typescript
beforeEach(() => {
  vi.mock('external-service', () => ({
    service: vi.fn()
  }));
});
```

## Best Practices

1. **Test Organization**
   - Use descriptive test names that explain the expected behavior
   - Group related tests using `describe` blocks
   - Keep test files next to the code they're testing

2. **Testing Priorities**
   - User interactions
   - Component rendering
   - Error states
   - Edge cases
   - Integration between components

3. **Assertions**
   - Use specific assertions (e.g., `toBeInTheDocument()` instead of `toBeTruthy()`)
   - Test for accessibility using role-based queries
   - Test component behavior, not implementation details

4. **Mocking**
   - Mock external dependencies
   - Use `beforeEach` to reset mocks between tests
   - Keep mocks as simple as possible
