import DOMPurify from "dompurify"

/**
 * Sanitize user-generated content to prevent XSS attacks
 * Use this for any content that comes from users (reviews, comments, chat, etc.)
 */
export function sanitizeHtml(dirty: string): string {
  // Only run on client side
  if (typeof window === "undefined") {
    // Basic server-side sanitization - remove script tags
    return dirty
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
      .replace(/on\w+="[^"]*"/gi, "")
      .replace(/on\w+='[^']*'/gi, "")
  }
  
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: ["b", "i", "em", "strong", "a", "p", "br", "ul", "ol", "li"],
    ALLOWED_ATTR: ["href", "target", "rel"],
    ALLOW_DATA_ATTR: false,
  })
}

/**
 * Sanitize HTML and strip all tags - use for plain text display
 */
export function sanitizeToText(dirty: string): string {
  if (typeof window === "undefined") {
    // Basic server-side strip
    return dirty.replace(/<[^>]*>/g, "")
  }
  
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
  })
}

/**
 * Safe text display - escapes HTML entities
 * Use this when rendering user input as text content (not innerHTML)
 */
export function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  }
  return text.replace(/[&<>"']/g, (char) => map[char])
}

/**
 * Component for safely rendering user-generated HTML content
 * Only use when you MUST render HTML (like rich text from WYSIWYG editor)
 */
export function createSafeHtml(dirty: string): { __html: string } {
  return { __html: sanitizeHtml(dirty) }
}

/**
 * Validate and sanitize URLs to prevent javascript: protocol attacks
 */
export function sanitizeUrl(url: string): string {
  const trimmed = url.trim().toLowerCase()
  
  // Block javascript: and data: URLs
  if (
    trimmed.startsWith("javascript:") ||
    trimmed.startsWith("data:") ||
    trimmed.startsWith("vbscript:")
  ) {
    return "#"
  }
  
  // Allow relative URLs and common protocols
  if (
    url.startsWith("/") ||
    url.startsWith("http://") ||
    url.startsWith("https://") ||
    url.startsWith("mailto:") ||
    url.startsWith("tel:")
  ) {
    return url
  }
  
  // For other URLs, prepend https://
  return `https://${url}`
}
