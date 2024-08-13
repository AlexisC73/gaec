import { defineConfig, presetUno } from 'unocss'

export default defineConfig({
  presets: [presetUno()],
  rules: [
    ['table-bordered', { 'border-collapse': 'collapse', 'width': '100%' }],
    ['th-style', { 'background-color': '#f2f2f2', 'padding': '8px', 'text-align': 'left' }],
    ['td-style', { border: '1px solid #ddd', padding: '8px' }],
    ['caption-style', { 'caption-side': 'top', 'font-weight': 'bold', 'margin-bottom': '10px' }],
  ],
})
