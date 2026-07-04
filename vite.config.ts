import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      outDir: 'dist/types',
    }),
  ],
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        spec: resolve(__dirname, 'src/spec/index.ts'),
        canvas: resolve(__dirname, 'src/canvas/index.ts'),
        graph: resolve(__dirname, 'src/graph/index.ts'),
        server: resolve(__dirname, 'src/server.ts'),
      },
      name: 'WireweaveUI',
      formats: ['es', 'cjs'],
      fileName: (format, entryName) => `${entryName}.${format === 'es' ? 'js' : 'cjs'}`,
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        // graph entry 의 optional peers — 소비자가 graph 를 쓸 때만 설치한다.
        // '@xyflow/react/dist/style.css' 는 의도적으로 external 이 아니다 (ui.css 로 번들).
        'react-force-graph-3d',
        'three',
        'd3-force-3d',
        'troika-three-text',
        '@xyflow/react',
      ],
      output: {
        banner: (chunk) => (chunk.name === 'server' ? '' : '"use client";'),
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'jsxRuntime',
        },
      },
    },
    cssCodeSplit: false,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
})
