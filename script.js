const toggle = document.querySelector('.nav-toggle');
const links = document.querySelector('.nav-links');
toggle.addEventListener('click', () => {
  const open = links.style.display === 'flex';
  links.style.display = open ? 'none' : 'flex';
  links.style.cssText += open ? '' : 'position:fixed;top:86px;left:5vw;right:5vw;background:rgba(255,255,255,0.92);backdrop-filter:blur(18px);flex-direction:column;padding:20px;border-radius:14px;box-shadow:0 20px 40px rgba(7,33,31,0.2);';
});