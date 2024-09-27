import './configs/tw-css-plugin'

import { getIconCollections, iconsPlugin } from '@egoist/tailwindcss-icons'
import plugin from 'tailwindcss/plugin'
import resolveConfig from 'tailwindcss/resolveConfig'

/** @type {import('tailwindcss').Config} */
export default resolveConfig({
  darkMode: ['class', '[data-theme="dark"]'],
  content: ['./entrypoints/**/*.{ts,tsx}', './src/**/*.{tsx,tsx}'],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },

    extend: {
      fontFamily: {
        theme: 'var(--fo-font-family)',
        default: 'SN pro, sans-serif, system-ui',
      },
      cursor: {
        button: 'var(--cursor-button)',
        select: 'var(--cursor-select)',
        checkbox: 'var(--cursor-checkbox)',
        link: 'var(--cursor-link)',
        menu: 'var(--cursor-menu)',
        radio: 'var(--cursor-radio)',
        switch: 'var(--cursor-switch)',
        card: 'var(--cursor-card)',
      },
      colors: {
        border: 'hsl(var(--border) / <alpha-value>)',
        background: 'hsl(var(--background) / <alpha-value>)',
        foreground: 'hsl(var(--foreground) / <alpha-value>)',

        destructive: {
          DEFAULT: 'hsl(var(--destructive) / <alpha-value>)',
          foreground: 'hsl(var(--destructive-foreground) / <alpha-value>)',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted) / <alpha-value>)',
          foreground: 'hsl(var(--muted-foreground) / <alpha-value>)',
        },
        accent: 'hsl(var(--fo-a) / <alpha-value>)',

        popover: {
          DEFAULT: 'hsl(var(--popover) / <alpha-value>)',
          foreground: 'hsl(var(--popover-foreground) / <alpha-value>)',
        },
        card: {
          DEFAULT: 'hsl(var(--card) / <alpha-value>)',
          foreground: 'hsl(var(--card-foreground) / <alpha-value>)',
        },
        native: {
          DEFAULT: 'hsl(var(--fo-native) / <alpha-value>)',
          active: 'hsl(var(--fo-native-active) / <alpha-value>)',
        },

        theme: {
          // https://uicolors.app/create
          accent: {
            DEFAULT: 'hsl(var(--fo-a) / <alpha-value>)',
            50: '#fff7ec',
            100: '#ffeed3',
            200: '#ffd9a5',
            300: '#ffbd6d',
            400: '#ff9532',
            500: '#ff760a',
            600: '#ff5c00',
            700: '#cc4102',
            800: '#a1330b',
            900: '#822c0c',
            950: '#461304',
          },

          vibrancyFg: 'hsl(var(--fo-vibrancy-foreground) / <alpha-value>)',
          vibrancyBg: 'var(--fo-vibrancy-background)',

          item: {
            active: 'var(--fo-item-active)',
            hover: 'var(--fo-item-hover)',
          },

          inactive: 'hsl(var(--fo-inactive) / <alpha-value>)',
          disabled: 'hsl(var(--fo-disabled) / <alpha-value>)',

          foreground: 'hsl(var(--fo-text-primary) / <alpha-value>)',
          background: 'var(--fo-background)',

          'foreground-hover':
            'hsl(var(--fo-text-primary-hover) / <alpha-value>)',

          modal: {
            background: 'var(--fo-modal-background)',
            'background-opaque': 'var(--fo-modal-background-opaque)',
          },
          button: {
            hover: 'var(--fo-button-hover)',
          },
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },

  plugins: [
    iconsPlugin({
      collections: {
        ...getIconCollections(['mingcute']),
      },
    }),
    require('tailwindcss-animate'),
    require('@tailwindcss/container-queries'),

    require('./tailwind-extend.css'),
    plugin(({ addVariant }) => {
      addVariant('f-motion-reduce', '[data-motion-reduce="true"] &')
      addVariant(
        'group-motion-reduce',
        ':merge(.group)[data-motion-reduce="true"] &',
      )
      addVariant(
        'peer-motion-reduce',
        ':merge(.peer)[data-motion-reduce="true"] ~ &',
      )
    }),
  ],
})
