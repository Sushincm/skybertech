document.addEventListener("DOMContentLoaded", () => {
  function glitchDecodeLoopForSpans(
    parentSelector = ".glitch-decode",
    interval = 35, // speed
    glitchPhase = 2000, // code phase duration (ms)
    glitchChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789?@#$_&+-",
    delayBetweenSpans = 500 // stagger delay for each span
  ) {
    document.querySelectorAll(parentSelector).forEach((parent) => {
      const spans = parent.querySelectorAll("span");
      spans.forEach((span, idx) => {
        const finalText = span.textContent;
        const finalLen = finalText.length;

        function showGlitchPhase() {
          let counter = 0;
          const glitchTimer = setInterval(() => {
            let out = "";
            for (let i = 0; i < finalLen; i++) {
              out +=
                glitchChars[Math.floor(Math.random() * glitchChars.length)];
            }
            span.textContent = out;
            counter += interval;
            if (counter >= glitchPhase) {
              clearInterval(glitchTimer);
              startDecode();
            }
          }, interval);
        }

        function startDecode() {
          let reveal = Array(finalLen).fill(false);
          let frame = 0;
          function render() {
            let out = "";
            for (let i = 0; i < finalLen; i++) {
              out += reveal[i]
                ? finalText[i]
                : glitchChars[Math.floor(Math.random() * glitchChars.length)];
            }
            span.textContent = out;
          }
          function step() {
            for (let i = 0; i < finalLen; i++) {
              if (!reveal[i]) {
                if (frame > i * 2 || Math.random() < 0.32) {
                  reveal[i] = true;
                }
              }
            }
            render();
            frame++;
            if (!reveal.every(Boolean)) {
              setTimeout(step, interval);
            } else {
              span.textContent = finalText;
              setTimeout(() => showGlitchPhase(), 1800); // Loop again
            }
          }
          render();
          step();
        }

        // Stagger start for each span for extra effect!
        setTimeout(showGlitchPhase, idx * delayBetweenSpans);
      });
    });
  }

  // Usage
  glitchDecodeLoopForSpans(".glitch-decode", 35, 2000, undefined, 400);
});
