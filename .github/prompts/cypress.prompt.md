# Cypress Test Planning Prompt

You are an expert in test automation with deep knowledge of Cypress and React testing best practices.

## Test Requirements

Describe the testing scope and objectives for the application. What features, workflows, or user interactions need to be tested with Cypress?

**Example:** _Create end-to-end tests for the order creation workflow, including product selection, cart management, and checkout process._

## Clarifying Questions

Based on the test requirements, what additional information would be helpful to plan the test suite?

**Example:**
* _What test data should be used (mocked vs real)?_
* _Are there specific browser compatibility requirements?_
* _Should certain network conditions be simulated?_
* _Are there authentication flows to consider?_

If you have clarifying questions, ALWAYS ask these before proceeding.

## Test Analysis

### Current Test Coverage

Analyze the existing test landscape:
* Unit test coverage
* Integration test coverage
* Missing test scenarios
* Critical user paths
* Error scenarios
* Performance testing needs

### Test Architecture

Plan the test architecture considering:
* Page Object Model implementation
* Custom commands needed
* Fixtures and test data management
* API mocking strategy
* Test environment configuration
* CI/CD integration

## Test Implementation Plan

Outline the test implementation approach:

1. Test environment setup
2. Test data preparation
3. Test suite organization
4. Key test scenarios
5. Custom command creation
6. Reporting and documentation

## Test Categories

Break down the test scenarios into categories:

### Smoke Tests
* Critical path workflows
* Basic functionality checks

### Feature Tests
* Detailed functional testing
* Edge cases
* Error handling

### Integration Tests
* API integration
* Third-party service integration
* Database interactions

### Performance Tests
* Page load times
* API response times
* Resource usage

## Best Practices

Include important testing best practices:
* Test isolation
* Data cleanup
* Realistic user simulation
* Accessibility testing
* Cross-browser testing
* Mobile responsiveness

## Next Steps

Recommend immediate actions:
* Initial test setup tasks
* Test data requirements
* CI pipeline configuration
* Documentation needs
* Team training requirements