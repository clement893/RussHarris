"""
Default theme configuration constants.
This module provides the complete default theme configuration
that includes all typography, spacing, shadows, and effects.
"""

DEFAULT_THEME_CONFIG = {
    # Mode: system, light, or dark
    "mode": "system",
    
    # Basic color fields (for backward compatibility and simple usage)
    "primary_color": "#3b82f6",
    "secondary_color": "#8b5cf6",
    "danger_color": "#ef4444",
    "warning_color": "#f59e0b",
    "info_color": "#06b6d4",
    "success_color": "#10b981",
    "font_family": "Inter",
    "border_radius": "8px",
    
    # Typography configuration
    "typography": {
        "fontFamily": "Inter, system-ui, -apple-system, sans-serif",
        "fontFamilyHeading": "Inter, system-ui, -apple-system, sans-serif",
        "fontFamilySubheading": "Inter, system-ui, -apple-system, sans-serif",
        "fontFamilyMono": "Fira Code, monospace",
        "fontSize": {
            "xs": "12px",
            "sm": "14px",
            "base": "16px",
            "lg": "18px",
            "xl": "20px",
            "2xl": "24px",
            "3xl": "30px",
            "4xl": "36px"
        },
        "fontWeight": {
            "normal": "400",
            "medium": "500",
            "semibold": "600",
            "bold": "700"
        },
        "lineHeight": {
            "tight": "1.25",
            "normal": "1.5",
            "relaxed": "1.75"
        },
        "textHeading": "#111827",
        "textSubheading": "#374151",
        "textBody": "#1f2937",
        "textSecondary": "#6b7280",
        "textLink": "#3b82f6"
    },
    
    # Color palette (expanded)
    "colors": {
        "background": "#ffffff",
        "foreground": "#000000",
        "primary": "#3b82f6",
        "primaryForeground": "#ffffff",
        "secondary": "#8b5cf6",
        "secondaryForeground": "#ffffff",
        "accent": "#f59e0b",
        "accentForeground": "#000000",
        "muted": "#f3f4f6",
        "mutedForeground": "#6b7280",
        "border": "#e5e7eb",
        "input": "#ffffff",
        "ring": "#3b82f6",
        "destructive": "#ef4444",
        "destructiveForeground": "#ffffff",
        "success": "#10b981",
        "successForeground": "#ffffff",
        "warning": "#f59e0b",
        "warningForeground": "#000000",
        "info": "#06b6d4",
        "infoForeground": "#ffffff"
    },
    
    # Spacing system
    "spacing": {
        "unit": "8px",
        "xs": "4px",
        "sm": "8px",
        "md": "16px",
        "lg": "24px",
        "xl": "32px",
        "2xl": "48px",
        "3xl": "64px"
    },
    
    # Border radius system
    "borderRadius": {
        "none": "0",
        "sm": "2px",
        "base": "4px",
        "md": "6px",
        "lg": "8px",
        "xl": "12px",
        "2xl": "16px",
        "full": "9999px"
    },
    
    # Shadow system
    "shadow": {
        "sm": "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        "base": "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
        "md": "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        "lg": "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        "xl": "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
    },
    
    # Breakpoints (for responsive design)
    "breakpoint": {
        "sm": "640px",
        "md": "768px",
        "lg": "1024px",
        "xl": "1280px",
        "2xl": "1536px"
    },
    
    # CSS Effects
    "effects": {
        "glassmorphism": {
            "enabled": False,
            "blur": "10px",
            "saturation": "180%",
            "opacity": 0.1,
            "borderOpacity": 0.2
        },
        "gradients": {
            "enabled": False,
            "direction": "to-br",
            "intensity": 0.3
        },
        "shadows": {
            "sm": "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
            "md": "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            "lg": "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
            "xl": "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
        }
    },
    
    # Font URL for loading Google Fonts or custom fonts
    # Example: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
    "font_url": None
}

