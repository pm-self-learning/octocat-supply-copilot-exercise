import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock the SVG imports
vi.mock('../assets/react.svg', () => ({
  default: 'react.svg'
}))

// Mock fetch API
global.fetch = vi.fn()

// Setup any global mocks or test utilities here