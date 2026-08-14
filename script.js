const toggle = document.querySelector('.nav-toggle');
const links = document.querySelector('.nav-links');
if (toggle && links) {
  toggle.addEventListener('click', () => {
    const open = links.style.display === 'flex';
    links.style.display = open ? 'none' : 'flex';
    links.style.cssText += open ? '' : 'position:fixed;top:86px;left:5vw;right:5vw;background:rgba(255,255,255,0.92);backdrop-filter:blur(18px);flex-direction:column;padding:20px;border-radius:14px;box-shadow:0 20px 40px rgba(7,33,31,0.2);';
  });
}

document.querySelectorAll('.filter-chips').forEach((group) => {
  group.querySelectorAll('.chip').forEach((chip) => {
    chip.addEventListener('click', () => {
      group.querySelectorAll('.chip').forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');
    });
  });
});

document.querySelectorAll('.faq-item').forEach((item) => {
  const question = item.querySelector('.faq-question');
  const answer = item.querySelector('.faq-answer');
  if (!question || !answer) return;
  question.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach((other) => {
      if (other !== item) {
        other.classList.remove('open');
        other.querySelector('.faq-answer').style.maxHeight = null;
      }
    });
    item.classList.toggle('open', !isOpen);
    answer.style.maxHeight = !isOpen ? answer.scrollHeight + 'px' : null;
  });
});