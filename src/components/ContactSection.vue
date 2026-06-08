<script setup lang="ts">
import { reactive, ref } from 'vue'

interface ContactFormData {
  name: string
  email: string
  message: string
}

defineProps<{
  sectionLabel?: string
  sectionTitle?: string
  sectionSubtitle?: string
}>()

const formData = reactive<ContactFormData>({
  name: '',
  email: '',
  message: '',
})

const errors = reactive<Partial<Record<keyof ContactFormData, string>>>({})
const submitStatus = ref<'idle' | 'sending' | 'success' | 'error'>('idle')
const errorMessage = ref('')

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(): boolean {
  errors.name = undefined
  errors.email = undefined
  errors.message = undefined

  let valid = true

  if (!formData.name.trim()) {
    errors.name = 'Name is required'
    valid = false
  }

  if (!formData.email.trim()) {
    errors.email = 'Email is required'
    valid = false
  } else if (!emailRegex.test(formData.email.trim())) {
    errors.email = 'Please enter a valid email address'
    valid = false
  }

  if (!formData.message.trim()) {
    errors.message = 'Message is required'
    valid = false
  }

  return valid
}

const STATICFORMS_ACCESS_KEY = import.meta.env.VITE_STATICFORMS_ACCESS_KEY

async function sendEmail(data: ContactFormData): Promise<void> {
  const response = await fetch('https://api.staticforms.xyz/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      accessKey: STATICFORMS_ACCESS_KEY,
      name: data.name,
      email: data.email,
      message: data.message,
      subject: `New message from ${data.name} via C.Clakery`,
    }),
  })
  if (!response.ok) {
    throw new Error('Failed to send message')
  }
}

async function handleSubmit() {
  if (!validate()) return

  submitStatus.value = 'sending'
  errorMessage.value = ''

  try {
    await sendEmail({ ...formData })
    submitStatus.value = 'success'
    formData.name = ''
    formData.email = ''
    formData.message = ''
  } catch {
    submitStatus.value = 'error'
    errorMessage.value = 'Message could not be sent. Please try again later.'
  }
}
</script>

<template>
  <section id="contact" class="contact-section">
    <div class="contact-inner">
      <div class="section-header">
        <div class="section-label">{{ sectionLabel || 'Get in touch' }}</div>
        <h2 class="section-title">{{ sectionTitle || 'Say Hello' }}</h2>
        <p class="section-subtitle">{{ sectionSubtitle || 'Have a question or want to place a custom order? Drop me a message.' }}</p>
      </div>

      <div v-if="submitStatus === 'success'" class="success-message">
        Your message has been sent successfully. I'll get back to you soon!
      </div>

      <form class="contact-form" @submit.prevent="handleSubmit" novalidate>
        <div class="form-group">
          <label for="contact-name">Name</label>
          <input
            id="contact-name"
            v-model="formData.name"
            type="text"
            placeholder="Your name"
            :class="{ 'input-error': errors.name }"
          />
          <span v-if="errors.name" class="error-text">{{ errors.name }}</span>
        </div>

        <div class="form-group">
          <label for="contact-email">Email</label>
          <input
            id="contact-email"
            v-model="formData.email"
            type="email"
            placeholder="Your email"
            :class="{ 'input-error': errors.email }"
          />
          <span v-if="errors.email" class="error-text">{{ errors.email }}</span>
        </div>

        <div class="form-group">
          <label for="contact-message">Message</label>
          <textarea
            id="contact-message"
            v-model="formData.message"
            placeholder="Your message"
            rows="6"
            :class="{ 'input-error': errors.message }"
          ></textarea>
          <span v-if="errors.message" class="error-text">{{ errors.message }}</span>
        </div>

        <div v-if="submitStatus === 'error'" class="error-message">
          {{ errorMessage }}
        </div>

        <button type="submit" class="send-button" :disabled="submitStatus === 'sending'">
          {{ submitStatus === 'sending' ? 'Sending...' : 'Send Message' }}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>
      </form>
    </div>
  </section>
</template>

<style scoped>
.contact-section {
  padding: 100px 60px 120px;
  background: var(--off-white);
  position: relative;
}

.contact-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, transparent, var(--terracotta-light), transparent);
  border-radius: 2px;
}

.contact-inner {
  max-width: 560px;
  margin: 0 auto;
}

.section-header {
  text-align: center;
  margin-bottom: 48px;
}

.section-label {
  font-size: 11px;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--terracotta);
  font-weight: 500;
  margin-bottom: 14px;
}

.section-title {
  font-family: var(--font-heading);
  font-size: 44px;
  color: var(--dark-brown);
  font-weight: 400;
  margin-bottom: 12px;
}

.section-subtitle {
  font-size: 15px;
  color: var(--soft-brown);
  font-weight: 300;
  line-height: 1.6;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-group label {
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: var(--soft-brown);
}

.form-group input,
.form-group textarea {
  padding: 14px 18px;
  border: 1px solid rgba(196, 168, 130, 0.25);
  border-radius: 12px;
  font-family: var(--font-body);
  font-size: 15px;
  font-weight: 300;
  background: var(--cream);
  color: var(--dark-brown);
  transition: border-color 0.3s, box-shadow 0.3s;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--terracotta-light);
  box-shadow: 0 0 0 3px rgba(192, 139, 92, 0.1);
}

.form-group input.input-error,
.form-group textarea.input-error {
  border-color: #c0392b;
}

.form-group textarea {
  resize: vertical;
  min-height: 120px;
}

.error-text {
  color: #c0392b;
  font-size: 13px;
  font-weight: 300;
}

.error-message {
  background: rgba(192, 57, 43, 0.08);
  border: 1px solid rgba(192, 57, 43, 0.2);
  color: #c0392b;
  padding: 12px 16px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 300;
}

.success-message {
  background: rgba(39, 174, 96, 0.08);
  border: 1px solid rgba(39, 174, 96, 0.2);
  color: #27ae60;
  padding: 12px 16px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 300;
  margin-bottom: 20px;
}

.send-button {
  align-self: flex-start;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 36px;
  background: var(--dark-brown);
  color: var(--cream);
  border: none;
  border-radius: 50px;
  font-family: var(--font-body);
  font-size: 13px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.4s ease;
  box-shadow: 0 4px 20px rgba(92, 74, 50, 0.15);
}

.send-button:hover {
  background: var(--terracotta);
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(192, 139, 92, 0.25);
}

.send-button:hover svg {
  transform: translateX(3px);
}

.send-button svg {
  transition: transform 0.3s;
}

.send-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .contact-section {
    padding: 80px 24px 100px;
  }

  .section-title {
    font-size: 34px;
  }
}
</style>
