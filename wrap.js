const wrapText = (text, width, height, align) => {
  let lines = [];
  while (text.length > 0) {
    let substr = text.substr(0, width);
    text = text.substr(width);
    if (substr[substr.length - 1] === " ") {
      substr = substr.substr(0, width - 1);
    } else {
      if (text.length === 0 || text[0] === " ") {
        text = text.substr(1);
      } else {
        const lastSpaceIdx = substr.lastIndexOf(" ");
        if (lastSpaceIdx !== -1) {
          text = substr.substr(lastSpaceIdx + 1) + text;
          substr = substr.substring(0, lastSpaceIdx);
        }
      }
    }
    lines.push(substr);
  }
  if (height) {
    const extra = lines.length - height;
    if (extra < 0) {
      const diff = height - lines.length;
      for( let i = 0; i < diff; i++) {
        lines.push(" ");
      }
    } else if (extra > 0) {
      lines.splice(height);
    }
  }
  if (align) {
    lines = lines.map((line) => pad(line, width, align));
  }
  return lines;
};

const pad = (text, width, align) => {
  const extra = Math.max(width - text.length, 0);
  if (align === "left") {
    return text + " ".repeat(extra);
  }
  if (align === "right") {
    return " ".repeat(extra) + text;
  }
  const leftExtra = Math.floor(extra / 2);
  const rightExtra = extra - leftExtra;
  return " ".repeat(leftExtra) + text + " ".repeat(rightExtra);
};

exports.wrapText = wrapText;
exports.pad = pad;
