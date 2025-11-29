"use client"

import React from "react"
import { sanitizeHtml, sanitizeToText, createSafeHtml, sanitizeUrl } from "@/lib/security/sanitize"

interface SafeHtmlProps {
  content: string
  className?: string
  as?: "div" | "span" | "p" | "article" | "section"
}

/**
 * Safely render user-generated HTML content.
 * Use this component when you MUST render HTML (like rich text from a WYSIWYG editor).
 * 
 * IMPORTANT: Only use this for content that genuinely needs HTML rendering.
 * For plain text display, use SafeText instead.
 */
export function SafeHtml({ content, className, as: Component = "div" }: SafeHtmlProps) {
  return React.createElement(Component, {
    className,
    dangerouslySetInnerHTML: createSafeHtml(content),
  })
}

interface SafeTextProps {
  content: string
  className?: string
  as?: "div" | "span" | "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
}

/**
 * Safely display user-generated text content.
 * Strips all HTML tags and displays as plain text.
 * 
 * Use this for user names, product reviews, chat messages, etc.
 */
export function SafeText({ content, className, as: Component = "span" }: SafeTextProps) {
  return React.createElement(Component, { className }, sanitizeToText(content))
}

interface SafeLinkProps {
  href: string
  children: React.ReactNode
  className?: string
  target?: "_blank" | "_self" | "_parent" | "_top"
}

/**
 * Safely render user-provided links.
 * Sanitizes URLs to prevent javascript: protocol attacks.
 * 
 * Use this when rendering links from user input.
 */
export function SafeLink({ href, children, className, target = "_blank" }: SafeLinkProps) {
  const safeHref = sanitizeUrl(href)
  
  return (
    <a 
      href={safeHref} 
      className={className}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
    >
      {children}
    </a>
  )
}

/**
 * Hook for sanitizing content
 */
export function useSanitize() {
  return {
    sanitizeHtml,
    sanitizeToText,
    sanitizeUrl,
    createSafeHtml,
  }
}
