/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem", // 32px
      screens: {
        '2xl': "1440px",
      },
    },
    extend: {
      borderRadius: {
        sm: 'calc(var(--radius) - 4px)', // radius - 4px
        md: 'calc(var(--radius) - 2px)', // radius - 2px
        lg: 'var(--radius)',             // base radius
        xl: 'calc(var(--radius) + 4px)', // radius + 4px
      },
      animation: {
        "ping-slow": "ping 2s cubic-bezier(0, 0, 0.2, 1) infinite",
        shake: "shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        fadeIn: "fadeIn 0.2s ease-out",
        fadeOut: "fadeOut 0.2s ease-out",
        reveal: 'reveal 0.4s ease-in-out forwards',
      },
      blur: {
        xxs: "0.33px",
        xs: "2px",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      boxShadow: {
        "card-sm": "0px 0.5px 12px -5px rgba(30,41,59,0.20)",
        "card-md": "0px 1px 25px -10px rgba(30,41,59,0.30)",
        "card-lg": "0px 2px 51px -19px rgba(30,41,59,0.40)",
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        card: 'var(--card)',
        'card-foreground': 'var(--card-foreground)',
        popover: 'var(--popover)',
        'popover-foreground': 'var(--popover-foreground)',
        primary: 'var(--primary)',
        'primary-foreground': 'var(--primary-foreground)',
        secondary: 'var(--secondary)',
        'secondary-foreground': 'var(--secondary-foreground)',
        muted: 'var(--muted)',
        'muted-foreground': 'var(--muted-foreground)',
        accent: 'var(--accent)',
        'accent-foreground': 'var(--accent-foreground)',
        destructive: 'var(--destructive)',
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
        'chart-1': 'var(--chart-1)',
        'chart-2': 'var(--chart-2)',
        'chart-3': 'var(--chart-3)',
        'chart-4': 'var(--chart-4)',
        'chart-5': 'var(--chart-5)',
        sidebar: 'var(--sidebar)',
        'sidebar-foreground': 'var(--sidebar-foreground)',
        'sidebar-primary': 'var(--sidebar-primary)',
        'sidebar-primary-foreground': 'var(--sidebar-primary-foreground)',
        'sidebar-accent': 'var(--sidebar-accent)',
        'sidebar-accent-foreground': 'var(--sidebar-accent-foreground)',
        'sidebar-border': 'var(--sidebar-border)',
        'sidebar-ring': 'var(--sidebar-ring)',
        brand: {
          DEFAULT: "#00E6CA",
          light: "#00E6CA",
          dark: "#00C4B8",
        },
        focus: "var(--formbricks-focus, #1982fc)",
        error: "rgb(from var(--formbricks-error) r g b / <alpha-value>)",
        brandnew: "var(--formbricks-brand, #038178)",
        borderColor: {
          primary: "var(--formbricks-border-primary, #e0e0e0)",
          secondary: "var(--formbricks-border-secondary, #0f172a)",
          disabled: "var(--formbricks-border-disabled, #ececec)",
        },
        labelColor: {
          primary: "var(--formbricks-label-primary, #0f172a)",
          secondary: "var(--formbricks-label-secondary, #384258)",
          disabled: "var(--formbricks-label-disabled, #bdbdbd)",
        },
        fill: {
          primary: "var(--formbricks-fill-primary, #fefefe)",
          secondary: "var(--formbricks-fill-secondary, #0f172a)",
          disabled: "var(--formbricks-fill-disabled, #e0e0e0)",
        },
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeOut: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        shake: {
          "10%, 90%": {
            transform: "translate3d(-1px, 0, 0)",
          },
          "20%, 80%": {
            transform: "translate3d(2px, 0, 0)",
          },
          "30%, 50%, 70%": {
            transform: "translate3d(-4px, 0, 0)",
          },
          "40%, 60%": {
            transform: "translate3d(4px, 0, 0)",
          },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        reveal: {
          from: {
            clipPath: 'circle(0% at var(--x, 50%) var(--y, 50%))',
            opacity: '0.7',
          },
          to: {
            clipPath: 'circle(150% at var(--x, 50%) var(--y, 50%))',
            opacity: '1',
          },
        },
      },
      width: {
        "sidebar-expanded": "4rem",    // 64px
        "sidebar-collapsed": "14rem",   // 224px
      },
      transitionProperty: {
        width: "width",
      },
      maxWidth: {
        "8xl": "88rem", // 1408px
      },
      screens: {
        xs: "430px",
      },
      scale: {
        97: "0.97",
      },
      gridTemplateColumns: {
        20: "repeat(20, minmax(0, 1fr))",
      },
      outlineColor: {
        ring: "oklch(0.708 0 0 / 0.5)", // 50% opacity
      }
    },
  },
  safelist: [{ pattern: /max-w-./, variants: "sm" }],
  darkMode: "class",
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography")
  ],
};