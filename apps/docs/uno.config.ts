import { defineConfig, presetUno, presetAttributify, presetIcons } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true
    })
  ],
  theme: {
    colors: {
      primary: '#3b82f6',
      success: '#10b981',
      warning: '#f59e0b',
      danger: '#ef4444',
    }
  },
  shortcuts: {
    'demo-btn': 'px-4 py-2 rounded bg-primary text-white hover:bg-blue-600 transition-colors cursor-pointer',
    'demo-card': 'p-4 rounded-lg border border-gray-200 bg-white shadow-sm'
  }
})

