"""Backward-compatible entry point for the stateful publishing pipeline."""

from pipeline import run


def generate_blog_posts():
    return run()


if __name__ == "__main__":
    generate_blog_posts()
