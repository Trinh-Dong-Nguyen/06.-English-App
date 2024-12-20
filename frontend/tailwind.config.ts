import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    screens: {
      sm: "640px",
      md: "740px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    container: {
      center: true,
      padding: "2rem",
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-conic-t": "conic-gradient(from 0deg at 50% 50%, var(--tw-gradient-stops))",
        // "gradient-conic-l": "conic-gradient(from 90deg at 50% 50%, var(--tw-gradient-stops))",
        // "gradient-middel": "linear-gradient(180deg, white 0%, rgba(252, 221, 236, 0.61) 50%, white 70%)",
      },
      width: {
        "login-image": "600px",
        "register-table": "600px",
      },
      fontSize: {
        title: "48px",
        default: "24px",
      },
      letterSpacing: {
        "neg-05": "-0.5%",
      },
      height: {
        inherit: "inherit",
        "login-image": "700px",
        "register-table": "800px",
      },
      boxShadow: {
        custom: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        sideBar: "4px 0px 16px 0px rgba(0, 0, 0, 0.25)",
        sectionCard: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
      },
      colors: {
        accordionTrigger: "#BCFFE3",
        sectionDesriptionModal: "#898989",
        lessonbg: "#FFF4F9",
        sideBar: "#FCDDEC80",
        checkboxBg: "var(--Iris-blue2, #7879F1)",
        comboboxBorder: "#F178B6",
        comboboxBg: "#FCDDEC",
        questionText: "#7879F1",
        headerIcon: "#5D5FEF",
        sectionHeaderBg: "rgba(252, 221, 236, 0.50)",
        currentBg: "#fff5fa",
        fuschia: "#ef5da8",
        content: "#1E1E1E",
        typeContent: "#757575",
        borderContent: "#A5A6F6",
        navContentBg: "#f0efefb8",
        navTitle: "#00b14f",
        placeHolder: "#94A3B8",
        primaryColor: "#0F172A",
        secondaryColor: "#64748B",
        backgroundColor: "#F1F5F9",
        title: "#1E293B",
        backgroundLine: "#AEAEB2",
        categorized: "#0EA5E9",
        customPink: "#FCDDEC4D",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "#F1F5F9",
        foreground: "hsl(var(--foreground))",
        primary: "#0F172A",
        secondary: "#64748B",
        header_pink: "rgba(252, 221, 236, 0.58)",
        header_white: "#FEFCFC",
        icon_color: "#5d5fef",
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("tailwind-scrollbar")],
} satisfies Config

export default config
