const rollup = require('rollup')
const babel = require('rollup-plugin-babel')

async function build() {
  const bundle = await rollup.rollup({
    input: 'src/v-clamp.js',
    plugins: [
      babel()
    ]
  })

  await bundle.write({
    file: 'dist/v-clamp.esm.js',
    format: 'esm'
  })
}

build()
