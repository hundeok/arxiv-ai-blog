"""Backward-compatible entry point for the stateful publishing pipeline."""

import sys

from pipeline import run, translate_existing_titles


def generate_blog_posts():
    return run()


if __name__ == "__main__":
    if "--translate-titles" in sys.argv:
        translate_existing_titles()
    else:
        generate_blog_posts()
