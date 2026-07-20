from process_content import download_and_parse_pdf
text = download_and_parse_pdf("https://arxiv.org/pdf/2607.16175v1.pdf", "test_paper")
with open("temp_full_text.txt", "w") as f:
    f.write(text)
