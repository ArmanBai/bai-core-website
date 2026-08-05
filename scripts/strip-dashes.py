"""Replace em-dashes (-, U+2014) and en-dashes (-, U+2013) with plain
hyphens (-) across source files. Skips vendored / generated folders."""

from __future__ import annotations

import os
import sys
from pathlib import Path

SKIP_DIRS = {
    ".git",
    ".next",
    "node_modules",
    ".venv",
    "venv",
    "__pycache__",
    "dist",
    "build",
    ".vercel",
    ".turbo",
    "coverage",
}

ALLOWED_EXT = {
    ".tsx",
    ".ts",
    ".js",
    ".jsx",
    ".mjs",
    ".cjs",
    ".json",
    ".mdx",
    ".md",
    ".py",
    ".css",
    ".html",
    ".yaml",
    ".yml",
    ".toml",
}

EM_DASH = "\u2014"
EN_DASH = "\u2013"


def should_skip_dir(path: Path) -> bool:
    return any(part in SKIP_DIRS for part in path.parts)


def process_file(path: Path) -> tuple[int, int]:
    try:
        text = path.read_text(encoding="utf-8")
    except (UnicodeDecodeError, OSError):
        return (0, 0)

    em = text.count(EM_DASH)
    en = text.count(EN_DASH)
    if em == 0 and en == 0:
        return (0, 0)

    new = text.replace(EM_DASH, "-").replace(EN_DASH, "-")
    path.write_text(new, encoding="utf-8")
    return (em, en)


def walk(root: Path) -> tuple[int, int, int]:
    total_em = total_en = file_count = 0
    for dirpath, dirnames, filenames in os.walk(root):
        dpath = Path(dirpath)
        if should_skip_dir(dpath.relative_to(root) if dpath != root else Path(".")):
            dirnames[:] = []
            continue
        dirnames[:] = [d for d in dirnames if d not in SKIP_DIRS]
        for name in filenames:
            fpath = dpath / name
            if fpath.suffix.lower() not in ALLOWED_EXT:
                continue
            em, en = process_file(fpath)
            if em or en:
                file_count += 1
                total_em += em
                total_en += en
                print(f"  {fpath.relative_to(root)}: {em} em, {en} en")
    return total_em, total_en, file_count


def main(roots: list[str]) -> None:
    grand_em = grand_en = grand_files = 0
    for r in roots:
        root = Path(r).resolve()
        if not root.exists():
            print(f"SKIP (missing): {root}")
            continue
        print(f"\n=== {root} ===")
        em, en, files = walk(root)
        grand_em += em
        grand_en += en
        grand_files += files
        print(f"  Subtotal: {em} em + {en} en across {files} files")

    print(
        f"\nTOTAL: {grand_em} em-dashes + {grand_en} en-dashes "
        f"replaced across {grand_files} files."
    )


if __name__ == "__main__":
    args = sys.argv[1:] or [
        r"C:\Users\User\Desktop\BAI",
        r"C:\Users\User\Desktop\tender_crm_neon",
    ]
    main(args)
