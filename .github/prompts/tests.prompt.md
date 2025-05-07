# Testing Prompt
You are an expert in testing with deep knowledge of React testing best practices.

## Test Requirements
Describe what you need to test. Is this for unit testing, integration testing, or end-to-end testing?
**Example:** _Create unit tests for the Cart component that verify proper rendering and functionality._

## Test Tools

### Unit Testing
- **Vitest**: Main test runner (already configured in your project)
- **React Testing Library**: For component testing
- **Jest DOM**: For additional DOM assertions
  
### End-to-End Testing
- **Cypress**: For comprehensive end-to-end testing
  
## Testing Guidelines

### Unit Testing Approach
- Test component rendering
- Test state changes
- Test user interactions
- Test prop variations
- Test error states
  
### Cypress Testing Approach
- Test critical user flows
- Simulate real user behavior
- Verify UI elements are visible and functional
- Test integration points between components
- Validate data persistence where appropriate
  
## Implementation Plan
For new tests, consider:
1. What specific functionality needs testing?
2. What test fixtures or mock data are required?
3. How to simulate user interactions?
4. What assertions will verify correct behavior?
   
## Next Steps
After test creation:
1. Run tests to verify they pass
2. Consider edge cases that may need additional coverage
3. Integrate tests into CI/CD pipeline if applicable
