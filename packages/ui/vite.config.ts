import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    vue(),
    dts({
      outDir: 'dist',
      include: ['src/index.ts'],
      insertTypesEntry: true,
      rollupTypes: false,
      copyDtsFiles: false,
      cleanVueFileName: true,
      staticImport: true,
      skipDiagnostics: false
    })
  ],
  worker: {
    format: 'es',
    plugins: () => []
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'XUX',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'mjs' : 'js'}`
    },
    
    rollupOptions: {
      external: [
        'vue',
        'dayjs',
        'qrcode',
        'axios',
        'element-china-area-data',
        'pinyin',
        '@iconify/vue',
        'glob'
      ],
      output: {
        globals: {
          vue: 'Vue',
          dayjs: 'dayjs',
          qrcode: 'qrcode',
          axios: 'axios'
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'index.css'
          return assetInfo.name || ''
        },
        chunkFileNames: 'assets/[name]-[hash].js',
        exports: 'named',
        preserveModules: false
      }
    },
    outDir: 'dist',
    emptyOutDir: true
  }
})

