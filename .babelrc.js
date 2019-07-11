// jest picks up this babel configuration 
// automatically and applies to the tests

// jest by default sets the node env to be test
const isTest = String(process.env.NODE_ENV) === 'test'

module.exports = {
  presets: [['@babel/preset-env', {modules: isTest ? 'commonjs' : false}], '@babel/react'],
  plugins: [
    'syntax-dynamic-import',
    'transform-class-properties',
    '@babel/plugin-proposal-object-rest-spread'
  ],
}