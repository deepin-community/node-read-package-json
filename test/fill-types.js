const t = require('tap')
const read = require('../')
const { resolve } = require('path')

t.test('adds types with a custom main field', t => {
  const fixture = resolve(__dirname, 'fixtures/types/custom-dts/one-new-field.json')
  read(fixture, (er, data) => {
    if (er) {
      throw er
    }
    t.match(data, {
      main: './custom-path.js',
      types: './custom-path.d.ts',
    })
    t.end()
  })
})

t.test('handles the inferred index.js', t => {
  const fixture = resolve(__dirname, 'fixtures/types/default-dts/inferred.json')
  read(fixture, (er, data) => {
    if (er) {
      throw er
    }
    t.match(data, {
      types: './index.d.ts',
    })
    t.end()
  })
})

t.test('handles subpaths and starting with ./', t => {
  const fixture = resolve(__dirname, 'fixtures/types/subpaths/subpath.json')
  read(fixture, (er, data) => {
    if (er) {
      throw er
    }
    t.match(data, {
      main: './a/b/c.js',
      types: './a/b/c.d.ts',
    })
    t.end()
  })
})

t.test('handles not overwriting existing fields', t => {
  const fixture = resolve(__dirname, 'fixtures/types/with-field/has-types-field.json')
  read(fixture, (er, data) => {
    if (er) {
      throw er
    }
    t.match(data, {
      types: '@types/express',
    })
    t.end()
  })
})

t.test('does not add types fields if not present', t => {
  const fixture = resolve(__dirname, 'fixtures/readmes/package.json')
  read(fixture, (er, data) => {
    if (er) {
      throw er
    }
    t.notOk(data.types, 'types field should not be added')
    t.end()
  })
})

// https://nodejs.org/api/esm.html#esm_writing_dual_packages_while_avoiding_or_minimizing_hazards

t.skip('handles esm modules', t => {
  const fixture = resolve(__dirname, 'fixtures/types/esmodule-exports/exports.json')
  read(fixture, (er, data) => {
    if (er) {
      throw er
    }
    t.match(data, {
      types: './a/b/c.d.ts',
    })

    t.end()
  })
})

// https://nodejs.org/api/esm.html#esm_exports_sugar

t.skip('handles esm modules with sugared exports', t => {
  const fixture = resolve(__dirname, 'fixtures/types/esmodule-exports-sugar/sugar.json')
  read(fixture, (er, data) => {
    if (er) {
      throw er
    }
    t.match(data, {
      types: './a/b.d.ts',
    })

    t.end()
  })
})
