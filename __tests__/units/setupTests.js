import '@testing-library/jest-dom'
import 'vitest-axe/extend-expect'
import * as matchers from 'vitest-axe/matchers'
import { expect } from 'vitest'
expect.extend(matchers)

process.env.TZ = 'Etc/UTC'
