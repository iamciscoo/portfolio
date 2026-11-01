import { rgb } from "pdf-lib";

export const colors = {
  ink: rgb(0.12, 0.13, 0.14),
  muted: rgb(0.34, 0.37, 0.4),
  accent: rgb(0.19, 0.35, 0.8),
  line: rgb(0.8, 0.81, 0.81),
  tint: rgb(0.94, 0.95, 0.98),
};
export const margin = 42;
export const pageSize = [595.28, 841.89];
export const contentWidth = pageSize[0] - margin * 2;
const clean = (value) =>
  value.replace(/[\u2010-\u2015]/g, "-").replace(/\u00a0/g, " ");

export function wrap(font, value, size, width) {
  return clean(value)
    .split("\n")
    .flatMap((paragraph) => {
      const lines = [];
      let line = "";
      for (const word of paragraph.split(/\s+/)) {
        const next = line ? `${line} ${word}` : word;
        if (line && font.widthOfTextAtSize(next, size) > width) {
          lines.push(line);
          line = word;
        } else line = next;
      }
      lines.push(line);
      return lines;
    });
}

export function text(
  page,
  font,
  value,
  x,
  y,
  size = 10.5,
  width = contentWidth,
  color = colors.ink,
) {
  const lines = wrap(font, value, size, width);
  const leading = size * 1.4;
  for (const line of lines) {
    if (y < 52) throw new Error(`PDF content exceeds page: ${line}`);
    page.drawText(line, { x, y, size, font, color });
    y -= leading;
  }
  return y;
}

export function rule(page, y, x = margin, width = contentWidth) {
  page.drawLine({
    start: { x, y },
    end: { x: x + width, y },
    thickness: 0.6,
    color: colors.line,
  });
}

export function mark(page, x, y, included) {
  const line = (x1, y1, x2, y2) =>
    page.drawLine({
      start: { x: x + x1, y: y + y1 },
      end: { x: x + x2, y: y + y2 },
      thickness: 1.4,
      color: included ? colors.accent : colors.muted,
    });
  if (included) {
    line(-4, 0, -1, -3);
    line(-1, -3, 5, 4);
  } else {
    line(-3, -3, 3, 3);
    line(-3, 3, 3, -3);
  }
}

export function addPage(doc, font, contact) {
  const page = doc.addPage(pageSize);
  text(page, font, "cisco*", margin, 792, 24);
  text(page, font, contact.shortName, 315, 796, 10, 235, colors.muted);
  rule(page, 773);
  rule(page, 49);
  // Stable contact details make the downloaded file useful away from the website.
  page.drawText(`${contact.email}  |  WhatsApp +${contact.whatsapp}`, {
    x: margin,
    y: 30,
    size: 8.5,
    font,
    color: colors.muted,
  });
  return page;
}
