"""
Multi-Tenancy Configuration and Utilities

This module provides configuration and utilities for multi-tenancy support.
The tenancy system can be enabled/disabled via the TENANCY_MODE environment variable.

Modes:
- single: No multi-tenancy (default) - single database, no filtering
- shared_db: Multi-tenancy with shared database - filtering by team_id
- separate_db: Multi-tenancy with separate databases - one DB per tenant

All tenancy features are conditionally enabled based on TENANCY_MODE.
"""

from enum import Enum
from typing import Optional
import os


class TenancyMode(str, Enum):
    """Tenancy mode enumeration"""
    SINGLE = "single"  # No multi-tenancy
    SHARED_DB = "shared_db"  # Shared database with team_id filtering
    SEPARATE_DB = "separate_db"  # Separate database per tenant


class TenancyConfig:
    """
    Tenancy configuration class
    
    Provides static methods to check tenancy status and mode.
    All tenancy features should check this class before executing.
    """
    
    _mode: Optional[TenancyMode] = None
    _enabled: Optional[bool] = None
    
    @classmethod
    def _get_mode(cls) -> TenancyMode:
        """Get tenancy mode from environment variable"""
        if cls._mode is None:
            mode_str = os.getenv("TENANCY_MODE", "single").lower().strip()
            try:
                cls._mode = TenancyMode(mode_str)
            except ValueError:
                # Invalid mode, default to single
                cls._mode = TenancyMode.SINGLE
        return cls._mode
    
    @classmethod
    def _is_enabled(cls) -> bool:
        """Check if tenancy is enabled"""
        if cls._enabled is None:
            cls._enabled = cls._get_mode() != TenancyMode.SINGLE
        return cls._enabled
    
    @classmethod
    def get_mode(cls) -> TenancyMode:
        """
        Get current tenancy mode
        
        Returns:
            TenancyMode: Current tenancy mode
        """
        return cls._get_mode()
    
    @classmethod
    def is_enabled(cls) -> bool:
        """
        Check if multi-tenancy is enabled
        
        Returns:
            bool: True if tenancy is enabled, False otherwise
        """
        return cls._is_enabled()
    
    @classmethod
    def is_single_mode(cls) -> bool:
        """
        Check if running in single-tenant mode
        
        Returns:
            bool: True if single mode, False otherwise
        """
        return cls._get_mode() == TenancyMode.SINGLE
    
    @classmethod
    def is_shared_db_mode(cls) -> bool:
        """
        Check if running in shared database mode
        
        Returns:
            bool: True if shared DB mode, False otherwise
        """
        return cls._get_mode() == TenancyMode.SHARED_DB
    
    @classmethod
    def is_separate_db_mode(cls) -> bool:
        """
        Check if running in separate database mode
        
        Returns:
            bool: True if separate DB mode, False otherwise
        """
        return cls._get_mode() == TenancyMode.SEPARATE_DB
    
    @classmethod
    def reset(cls) -> None:
        """
        Reset configuration cache (useful for testing)
        """
        cls._mode = None
        cls._enabled = None

