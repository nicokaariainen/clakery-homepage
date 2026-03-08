<template>
  <div class="contact-view">
    <h1>Contact</h1>
    <p class="contact-intro">Have a question or want to place a custom order? Send me a message.</p>

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
        {{ submitStatus === 'sending' ? 'Sending...' : 'Send' }}
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

interface ContactFormData {
  name: string
  email: string
  message: string
}

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

<style scoped>
.contact-view {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.contact-view h1 {
  font-family: 'Bitter', serif;
  color: var(--color-dark-brown);
  margin-bottom: 0.5rem;
}

.contact-intro {
  color: var(--color-dark-brown);
  margin-bottom: 2rem;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.form-group label {
  font-weight: 600;
  color: var(--color-dark-brown);
}

.form-group input,
.form-group textarea {
  padding: 0.6rem 0.75rem;
  border: 2px solid var(--color-border);
  border-radius: 4px;
  font-family: 'Bitter', serif;
  font-size: 1rem;
  background: var(--color-background-soft);
  color: var(--color-dark-brown);
  transition: border-color 0.2s;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--color-dark-red);
}

.form-group input.input-error,
.form-group textarea.input-error {
  border-color: var(--color-dark-red);
}

.error-text {
  color: var(--color-dark-red);
  font-size: 0.85rem;
}

.error-message {
  background: var(--color-cream);
  border: 1px solid var(--color-dark-red);
  color: var(--color-dark-red);
  padding: 0.75rem;
  border-radius: 4px;
}

.success-message {
  background: var(--color-cream);
  border: 1px solid var(--color-dark-brown);
  color: var(--color-dark-brown);
  padding: 0.75rem;
  border-radius: 4px;
  margin-bottom: 1.5rem;
}

.send-button {
  align-self: flex-start;
  padding: 0.6rem 2rem;
  background: var(--color-dark-brown);
  color: var(--color-cream);
  border: none;
  border-radius: 4px;
  font-family: 'Bitter', serif;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.send-button:hover {
  background: var(--color-dark-red);
}

.send-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
