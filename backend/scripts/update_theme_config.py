#!/usr/bin/env python3
"""
Script to update the existing TemplateTheme config to use proper field names.
Run this from the backend directory: python scripts/update_theme_config.py
"""

import asyncio
import sys
import os
import json
from pathlib import Path

# Add the backend directory to the path
backend_dir = Path(__file__).parent.parent
sys.path.insert(0, str(backend_dir))

from app.core.database import get_db
from app.models.theme import Theme
from sqlalchemy import select, text


async def update_theme_config():
    """Update TemplateTheme config to use proper field names."""
    print("=" * 60)
    print("Updating TemplateTheme config...")
    print("=" * 60)
    
    try:
        async for db in get_db():
            # Find TemplateTheme
            result = await db.execute(select(Theme).where(Theme.id == 32))
            theme = result.scalar_one_or_none()
            
            if not theme:
                print("\n❌ TemplateTheme (ID 32) not found!")
                print("   Run create_default_theme.py first to create it.")
                return
            
            print(f"\n📝 Found TemplateTheme:")
            print(f"   ID: {theme.id}")
            print(f"   Name: {theme.name}")
            print(f"   Current config: {json.dumps(theme.config, indent=2)}")
            
            # Get current config
            current_config = theme.config or {}
            
            # Create new config with proper field names
            new_config = {
                "mode": current_config.get("mode", "system"),
                "primary_color": current_config.get("primary_color") or current_config.get("primary", "#3b82f6"),
                "secondary_color": current_config.get("secondary_color") or current_config.get("secondary", "#8b5cf6"),
                "danger_color": current_config.get("danger_color") or current_config.get("danger", "#ef4444"),
                "warning_color": current_config.get("warning_color") or current_config.get("warning", "#f59e0b"),
                "info_color": current_config.get("info_color") or current_config.get("info", "#06b6d4"),
                "success_color": current_config.get("success_color", "#10b981"),
                "font_family": current_config.get("font_family", "Inter"),
                "border_radius": current_config.get("border_radius", "8px"),
            }
            
            # Preserve any additional fields
            for key, value in current_config.items():
                if key not in new_config and key not in ["primary", "secondary", "danger", "warning", "info"]:
                    new_config[key] = value
            
            # Update the theme
            theme.config = new_config
            await db.commit()
            await db.refresh(theme)
            
            print(f"\n✅ TemplateTheme config updated successfully!")
            print(f"   New config: {json.dumps(theme.config, indent=2)}")
            
            break
        
        print("\n" + "=" * 60)
        print("Done!")
        print("=" * 60)
        
    except Exception as e:
        print(f"\n❌ Error updating theme config: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)


if __name__ == "__main__":
    asyncio.run(update_theme_config())

