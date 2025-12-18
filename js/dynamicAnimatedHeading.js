      const words = ["more efficient", "smarter", "greener"];
      let index = 0;
      const textElement = document.querySelector(".dynamic-text");

      setInterval(() => {
        index = (index + 1) % words.length;
        // Fade out text
        textElement.style.opacity = 0;

        setTimeout(() => {
          // Change text and fade back in
          textElement.textContent = words[index];
          textElement.style.opacity = 1;
        }, 300); // Sync with fade duration
      }, 2500); // Change every 2.5 seconds