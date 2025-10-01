import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import fs from 'fs'
import csv from 'csv-parser'

function csvToJson() {
  return {
    name: 'csv-to-json',
    buildStart() {
      return new Promise((resolve, reject) => {
        const results = []
        let id = 1;

        const typeMap = {
          prA: 'planen',
          IA: 'pflegen',
          wA: 'wissen'
        }

        fs.createReadStream('src/data/fidicare.csv')
          .pipe(csv({ separator: ';' }))
          .on('data', (data) => {
            const name = data[Object.keys(data)[0]]
            const url = data[Object.keys(data)[1]]
            const description = data[Object.keys(data)[2]]
            const typeTechnology = data[Object.keys(data)[3]]
            const [typeRaw, technology] = typeTechnology.split('/')

            const typeKey = typeRaw?.trim() ?? ''
            const mappedType = typeMap[typeKey] ?? typeKey // Fallback falls kein Mapping existiert

            results.push({
              id: id,
              name: name.trim() ?? '',
              url: url.trim() ?? '',
              description: description.trim() ?? '',
              type: mappedType,
              technology: technology.trim() ?? ''
            })

            id++;
          })
          .on('end', () => {
            fs.writeFileSync('src/data/fidicare.json', JSON.stringify(results, null, 2))
            resolve()
          })
          .on('error', reject)
      })
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  base: "./",
  plugins: [
    vue(),
    vueDevTools(),
    csvToJson(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
