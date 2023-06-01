import * as nock from 'nock'

// Disable outgoing HTTP requests from the tests. This will ensure we never hit
// a downstream service during the tests by mistake.
nock.disableNetConnect()
