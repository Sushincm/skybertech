document.querySelectorAll('.blink-para').forEach(para => {
  const text = para.textContent.trim();
  const words = text.split(' ');
  para.innerHTML = words.map((word, i) =>
    `<span style="animation-delay:${i * 0.07}s">${word} </span>`
  ).join('');
});
