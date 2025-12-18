const creepyButtons = document.querySelectorAll(".creepy-btn");

creepyButtons.forEach(btn => {
	const eyesContainer = btn.querySelector(".creepy-btn__eyes");
	const pupils = btn.querySelectorAll(".creepy-btn__pupil");

	function updateEyes(e) {
		const eventX = e.touches ? e.touches[0].clientX : e.clientX;
		const eventY = e.touches ? e.touches[0].clientY : e.clientY;

		const rect = eyesContainer.getBoundingClientRect();
		const centerX = rect.left + rect.width / 2;
		const centerY = rect.top + rect.height / 2;

		const dx = eventX - centerX;
		const dy = eventY - centerY;

		const angle = Math.atan2(-dy, dx) + Math.PI / 2;
		const distance = Math.hypot(dx, dy);

		const visionRangeX = 180;
		const visionRangeY = 75;

		const x = Math.sin(angle) * distance / visionRangeX;
		const y = Math.cos(angle) * distance / visionRangeY;

		pupils.forEach(pupil => {
			pupil.style.transform = `translate(${(-50 + x * 50)}%, ${(-50 + y * 50)}%)`;
		});
	}

	btn.addEventListener("mousemove", updateEyes);
	btn.addEventListener("touchmove", updateEyes);
});
