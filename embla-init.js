window.initEmbla = (selector, options = {}) => {
  const root = document.querySelector(selector);
  if (!root) return;

  const viewport = root.querySelector('.embla__viewport');
  const prevBtn = root.querySelector('#prevBtn');
  const nextBtn = root.querySelector('#nextBtn');
  const dotsContainer = root.querySelector('#embla-dots');

  if (!viewport) return;

  // Initialize Embla
  const embla = new window.EmblaCarousel(viewport, options);

  // Create dots
  const dots = [];
  embla.scrollSnapList().forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'embla__dot';
    dot.addEventListener('click', () => embla.scrollTo(i));
    dotsContainer.appendChild(dot);
    dots.push(dot);
  });

  // Update dots to reflect selected slide
  const updateDots = () => {
    const selectedIndex = embla.selectedScrollSnap();
    dots.forEach((dot, i) => dot.classList.toggle('embla__dot--selected', i === selectedIndex));
  };

  // Enable/disable prev/next buttons
  const toggleButtons = () => {
    if (prevBtn) prevBtn.disabled = !embla.canScrollPrev();
    if (nextBtn) nextBtn.disabled = !embla.canScrollNext();
  };

  // Attach button events
  if (prevBtn) prevBtn.addEventListener('click', () => embla.scrollPrev());
  if (nextBtn) nextBtn.addEventListener('click', () => embla.scrollNext());

  // Listen to Embla events
  embla.on('select', () => {
    updateDots();
    toggleButtons();
  });

  // Initial state
  updateDots();
  toggleButtons();

  return embla;
};
