# Changes Documentation

This directory contains markdown files documenting all changes, fixes, and previous work done on the IIC official website project.

## Structure

```
sidharth-test/
├── changes/          # Active documentation
│   ├── DROPDOWN_CUSTOMIZATION_GUIDE.md
│   └── README.md
└── tested/           # Verified & completed work
    └── TESTED_ITEMS.md
```

## Active Files

- **`DROPDOWN_CUSTOMIZATION_GUIDE.md`** - Complete reference for all dropdowns across admin pages
  - Central constants location (`helpers.js`)
  - Per-page dropdown sources
  - Pattern to add custom option to any dropdown

## Tested Items

See `tested/TESTED_ITEMS.md` for verified working features.

---

## Adding New Documentation

1. Create dated file in `changes/` for significant changes
2. Update `tested/TESTED_ITEMS.md` when features are verified