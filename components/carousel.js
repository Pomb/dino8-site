/**
 * Carousel — shared image carousel component.
 *
 * Carousel.create(el, images, alt, interval)
 *   el       — container element
 *   images   — array of image src strings
 *   alt      — alt text for images
 *   interval — ms between auto-advance (0 to disable)
 *   Returns { destroy(), el }
 */
var Carousel = (function() {
  function create(el, images, alt, interval) {
    if (!images || images.length === 0) return null;

    var imgs = images.map(function(src, i) {
      return '<img src="' + src + '" alt="' + alt + '"' + (i === 0 ? ' class="active"' : '') + '>';
    }).join('');

    var dotsInner = '';
    if (images.length > 1) {
      dotsInner = images.map(function(_, i) {
        return '<span' + (i === 0 ? ' class="active"' : '') + ' data-slide="' + i + '"></span>';
      }).join('');
    }

    el.innerHTML = '<div class="carousel">' + imgs + '<div class="carousel-dots">' + dotsInner + '</div></div>';

    var timer = null;
    if (images.length > 1) {
      var carousel = el.querySelector('.carousel');
      var cImgs = carousel.querySelectorAll('img');
      var cDots = carousel.querySelectorAll('.carousel-dots span');
      var current = 0;

      function show(idx) {
        cImgs[current].classList.remove('active');
        cDots[current].classList.remove('active');
        current = idx;
        cImgs[current].classList.add('active');
        cDots[current].classList.add('active');
      }

      function resetTimer() {
        if (timer) clearInterval(timer);
        if (interval) {
          timer = setInterval(function() {
            show((current + 1) % cImgs.length);
          }, interval);
        }
      }

      cDots.forEach(function(dot) {
        dot.addEventListener('click', function() {
          show(parseInt(dot.dataset.slide));
          resetTimer();
        });
      });

      resetTimer();
    }

    return {
      destroy: function() { if (timer) clearInterval(timer); },
      el: el
    };
  }

  return { create: create };
})();
