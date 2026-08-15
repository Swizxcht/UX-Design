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

document.querySelectorAll('.select-grid').forEach((grid) => {
  grid.querySelectorAll('.select-card').forEach((card) => {
    card.addEventListener('click', () => {
      grid.querySelectorAll('.select-card').forEach((c) => c.classList.remove('selected'));
      card.classList.add('selected');
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

const KatigStorage = (() => {
  const memory = {};
  const hasRemote = () => typeof window.storage !== 'undefined' && window.storage !== null;

  async function get(key, shared = false) {
    try {
      if (hasRemote()) {
        const result = await window.storage.get(key, shared);
        return result ? result.value : null;
      }
      return Object.prototype.hasOwnProperty.call(memory, key) ? memory[key] : null;
    } catch (err) {
      return null;
    }
  }

  async function set(key, value, shared = false) {
    try {
      if (hasRemote()) {
        await window.storage.set(key, value, shared);
        return true;
      }
      memory[key] = value;
      return true;
    } catch (err) {
      return false;
    }
  }

  async function remove(key, shared = false) {
    try {
      if (hasRemote()) {
        await window.storage.delete(key, shared);
        return true;
      }
      delete memory[key];
      return true;
    } catch (err) {
      return false;
    }
  }

  async function list(prefix = '', shared = false) {
    try {
      if (hasRemote()) {
        const result = await window.storage.list(prefix, shared);
        return result ? result.keys : [];
      }
      return Object.keys(memory).filter((k) => k.startsWith(prefix));
    } catch (err) {
      return [];
    }
  }

  return { get, set, remove, list, isRemote: hasRemote };
})();

const KatigAuth = (() => {
  async function findUser(email) {
    const raw = await KatigStorage.get('users:' + email.toLowerCase());
    return raw ? JSON.parse(raw) : null;
  }

  async function saveUser(user) {
    await KatigStorage.set('users:' + user.email.toLowerCase(), JSON.stringify(user));
  }

  async function getSession() {
    const raw = await KatigStorage.get('session');
    return raw ? JSON.parse(raw) : null;
  }

  async function setSession(user) {
    await KatigStorage.set('session', JSON.stringify({ name: user.name, email: user.email }));
  }

  async function clearSession() {
    await KatigStorage.remove('session');
  }

  return { findUser, saveUser, getSession, setSession, clearSession };
})();

(async () => {
  const authLink = document.getElementById('navAuthLink');
  if (!authLink) return;
  const session = await KatigAuth.getSession();
  if (session) {
    authLink.textContent = 'Sign out';
    authLink.setAttribute('href', '#');
    authLink.addEventListener('click', async (e) => {
      e.preventDefault();
      await KatigAuth.clearSession();
      window.location.href = 'index.html';
    });
  }
})();