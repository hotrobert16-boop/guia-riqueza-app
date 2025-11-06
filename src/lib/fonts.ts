/**
 * 🎨 Font Configuration for Lasy AI Templates
 * 
 * All fonts are installed via @fontsource packages and ready to use.
 * Import any font you need in your components or layout.
 */

// Geist Fonts (Vercel's official fonts)
import '@fontsource/geist-sans/400.css'
import '@fontsource/geist-sans/500.css'
import '@fontsource/geist-sans/600.css'
import '@fontsource/geist-sans/700.css'

import '@fontsource/geist-mono/400.css'
import '@fontsource/geist-mono/500.css'
import '@fontsource/geist-mono/600.css'
import '@fontsource/geist-mono/700.css'

// Popular Web Fonts
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'

import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

// Code Fonts
import '@fontsource/fira-code/400.css'
import '@fontsource/fira-code/500.css'
import '@fontsource/fira-code/600.css'

import '@fontsource/jetbrains-mono/400.css'
import '@fontsource/jetbrains-mono/500.css'
import '@fontsource/jetbrains-mono/600.css'

/**
 * Font family configurations for easy use
 */
export const fontFamilies = {
  // Sans-serif fonts
  geist: '"Geist Sans", ui-sans-serif, system-ui, sans-serif',
  inter: '"Inter", ui-sans-serif, system-ui, sans-serif',
  roboto: '"Roboto", ui-sans-serif, system-ui, sans-serif',
  
  // Monospace fonts
  geistMono: '"Geist Mono", ui-monospace, SFMono-Regular, "SF Mono", monospace',
  firaCode: '"Fira Code", ui-monospace, SFMono-Regular, monospace',
  jetbrains: '"JetBrains Mono", ui-monospace, SFMono-Regular, monospace',
} as const