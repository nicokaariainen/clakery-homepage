<script setup lang="ts">
defineProps<{
  artistName: string
  instagramUrl: string
  email?: string
  instagramHandle?: string
}>()
</script>

<template>
  <footer class="site-footer">
    <div class="footer-inner">
      <div class="footer-top">
        <div class="footer-brand">
          <div class="footer-logo">c.<span>clakery</span></div>
          <p class="footer-tagline">Where Clay Meets Bakery</p>
        </div>
        <div class="footer-links-group">
          <div class="footer-col">
            <h4>NAVIGATE</h4>
            <ul>
              <li><a href="#hero">Home</a></li>
              <li><a href="#catalog">Catalog</a></li>
              <li><a href="#about">About</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>CONNECT</h4>
            <ul>
              <li><a :href="email ? `mailto:${email}` : '#'">{{ email || 'hello@cclakery.com' }}</a></li>
              <li><a :href="instagramUrl" target="_blank" rel="noopener noreferrer">{{ instagramHandle || '@c.clakery' }}</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-col">
          <h4>FOLLOW ALONG</h4>
          <div class="footer-social">
            <a :href="instagramUrl" target="_blank" rel="noopener noreferrer" class="social-icon ig-highlight" aria-label="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p class="footer-copy">&copy; 2026 c.clakery. All rights reserved.</p>
        <p class="footer-made">Crafted with 🤎 and a little bit of clay</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  background: var(--dark-brown);
  color: var(--beige);
  padding: 60px 60px 30px;
}

.footer-inner {
  max-width: 1100px;
  margin: 0 auto;
}

.footer-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 50px;
}

/* Brand */
.footer-brand .footer-logo {
  font-family: 'DM Serif Display', serif;
  font-size: 28px;
  color: var(--cream);
  margin-bottom: 10px;
}
.footer-brand .footer-logo span {
  color: var(--terracotta-light);
}
.footer-brand .footer-tagline {
  font-size: 13px;
  color: var(--warm-brown);
  font-style: italic;
  font-family: 'DM Serif Display', serif;
}

/* Links group */
.footer-links-group {
  display: flex;
  gap: 80px;
}

.footer-col h4 {
  font-size: 11px;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  color: var(--warm-brown);
  margin-bottom: 18px;
  font-weight: 500;
}
.footer-col ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.footer-col li {
  margin-bottom: 12px;
}
.footer-col a {
  color: var(--beige-dark);
  text-decoration: none;
  font-size: 14px;
  font-weight: 300;
  transition: color 0.3s;
}
.footer-col a:hover {
  color: var(--terracotta-light);
}

/* Social */
.footer-social {
  display: flex;
  gap: 12px;
}
.social-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 252, 247, 0.08);
  border: 1px solid rgba(255, 252, 247, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: var(--beige);
  transition: all 0.3s;
}
.social-icon:hover {
  background: var(--terracotta);
  border-color: var(--terracotta);
  transform: translateY(-2px);
}
.social-icon.ig-highlight {
  background: rgba(192, 139, 92, 0.2);
  border-color: var(--terracotta-light);
}
.social-icon svg {
  width: 18px;
  height: 18px;
  fill: var(--beige);
}

/* Bottom bar */
.footer-bottom {
  border-top: 1px solid rgba(196, 168, 130, 0.15);
  padding-top: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.footer-copy {
  font-size: 12px;
  color: var(--warm-brown);
  font-weight: 300;
}
.footer-made {
  font-size: 12px;
  color: var(--warm-brown);
  font-weight: 300;
  display: flex;
  align-items: center;
  gap: 6px;
}

/* Responsive */
@media (max-width: 768px) {
  .site-footer {
    padding: 40px 24px 24px;
  }
  .footer-top {
    flex-direction: column;
    align-items: center;
    gap: 32px;
    text-align: center;
  }
  .footer-brand {
    text-align: center;
  }
  .footer-links-group {
    flex-direction: column;
    align-items: center;
    gap: 28px;
  }
  .footer-col {
    text-align: center;
  }
  .footer-social {
    justify-content: center;
  }
  .footer-bottom {
    flex-direction: column;
    align-items: center;
    gap: 12px;
    text-align: center;
  }
}
</style>
