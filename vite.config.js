import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';
import {resolve} from 'path'

const pathSrc = resolve(__dirname, './resources');

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.js',
            refresh: true,
        }),
        vue({
            template: {
                transformAssetUrls: {
                    base: null,
                    includeAbsolute: false,
                },
            },
        }),
    ],
    resolve: {
        extensions: ['.vue', '.js'],
        alias: {
            '@': resolve(__dirname, 'resources/js'),
            sass: resolve(__dirname, 'resources/sass'),
            pages: resolve(__dirname, 'resources/js/pages'),
            library: resolve(__dirname, 'resources/js/library'),
            atoms: resolve(__dirname, 'resources/js/components/atoms'),
            molecules: resolve(__dirname, 'resources/js/components/molecules'),
            organisms: resolve(__dirname, 'resources/js/components/organisms'),
        },
        dedupe: [
            'vue',
        ],
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "${pathSrc}/sass/index.scss";`,
        },
      },
    },
});
