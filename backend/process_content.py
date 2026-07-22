"""Backward-compatible entry point for the stateful publishing pipeline."""

import sys

from pipeline import audit_existing_cards, run, translate_existing_titles


def generate_blog_posts():
    return run()


if __name__ == "__main__":
    if "--translate-titles" in sys.argv:
        translate_existing_titles()
    elif "--audit-cards" in sys.argv:
        audit_existing_cards()
    else:
        generate_blog_posts()
