"""Backward-compatible entry point for the stateful publishing pipeline."""

import sys
import traceback

from pipeline import audit_existing_cards, run, translate_existing_titles, notify_telegram_error


def generate_blog_posts():
    return run()


if __name__ == "__main__":
    try:
        if "--translate-titles" in sys.argv:
            translate_existing_titles()
        elif "--audit-cards" in sys.argv:
            audit_existing_cards()
        else:
            generate_blog_posts()
    except Exception as e:
        error_msg = f"Crash in process_content.py:\n\n{traceback.format_exc()}"
        print(error_msg)
        notify_telegram_error(error_msg)
        sys.exit(1)
