import { expect, test, describe, beforeEach } from "bun:test";
import { thumbPairHtml, setCompareLabels, getCompareLabels } from "./image-compare";

describe("image-compare utilities", () => {
  const defaultLabels = {
    before: 'Before',
    after: 'After',
    compareBtn: 'Compare',
    close: 'Close',
  };

  beforeEach(() => {
    setCompareLabels(defaultLabels);
  });

  test("getCompareLabels returns default labels", () => {
    expect(getCompareLabels()).toEqual(defaultLabels);
  });

  test("setCompareLabels updates labels correctly", () => {
    setCompareLabels({ before: "Original", after: "Modified" });
    const labels = getCompareLabels();
    expect(labels.before).toBe("Original");
    expect(labels.after).toBe("Modified");
    expect(labels.compareBtn).toBe("Compare");
  });

  test("thumbPairHtml generates correct HTML structure", () => {
    const beforeUrl = "before.jpg";
    const afterUrl = "after.jpg";
    const html = thumbPairHtml(beforeUrl, afterUrl);

    expect(html).toContain('src="before.jpg"');
    expect(html).toContain('src="after.jpg"');
    expect(html).toContain('alt="Before"');
    expect(html).toContain('alt="After"');
    expect(html).toContain('class="flex items-center gap-1"');
  });

  test("thumbPairHtml escapes attributes to prevent XSS", () => {
    const maliciousUrl = '"><script>alert(1)</script>';
    const html = thumbPairHtml(maliciousUrl, "after.jpg");

    expect(html).not.toContain('src=""><script>');
    expect(html).toContain('src="&quot;&gt;&lt;script&gt;alert(1)&lt;/script&gt;"');
  });

  test("thumbPairHtml uses updated labels for alt text", () => {
    setCompareLabels({ before: "Old & Bold", after: 'New "Improved"' });
    const html = thumbPairHtml("a.jpg", "b.jpg");

    expect(html).toContain('alt="Old &amp; Bold"');
    expect(html).toContain('alt="New &quot;Improved&quot;"');
  });
});
