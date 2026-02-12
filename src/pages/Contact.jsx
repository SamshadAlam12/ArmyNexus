import { useState } from 'react'
import { MailIcon, PhoneIcon, LocationIcon, MessageIcon } from '../components/Icons'
import ScrollReveal from '../components/ScrollReveal'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState({ success: '', error: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const faqs = [
    {
      question: 'How do I get access to Army Nexus?',
      answer:
        'Complete the enlistment process through our Sign Up page. Once verified, you will receive secure portal access.',
    },
    {
      question: 'Is my data secure on Army Nexus?',
      answer:
        'Yes. We employ military‑grade encryption and layered security protocols to protect all operational data.',
    },
    {
      question: 'Can I customize my profile?',
      answer:
        'Absolutely. Your dashboard allows full customization including bio, image, rank details, and social links.',
    },
  ]

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    if (status.success || status.error) {
      setStatus({ success: '', error: '' })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Simple front-end validation (fields are already required)
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus({ success: '', error: 'Please fill out all fields before sending.' })
      return
    }

    setIsSubmitting(true)

    // Simulate sending message (no backend)
    setTimeout(() => {
      setStatus({
        success: 'Your message has been sent successfully. Our command center will respond shortly.',
        error: '',
      })
      setForm({ name: '', email: '', message: '' })
      setIsSubmitting(false)
    }, 400)
  }

  return (
    <ScrollReveal>
    <div className="min-w-[320px] w-full max-w-full overflow-x-hidden">
      {/* Hero */}
      <section className="px-4 sm:px-6 pt-12 sm:pt-14 lg:pt-16 pb-8 sm:pb-10 lg:pb-12 border-b border-army-primary/40 reveal reveal-up">
        <div className="mx-auto max-w-5xl text-center">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full border border-army-olive/40 bg-surface-card/70 px-3 py-1 text-[11px] font-medium tracking-wide text-army-oliveLight"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-army-olive" />
            CONTACT US
          </button>
          <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-army-sand">
            <span>Get In </span>
            <span className="text-army-sandLight">Touch</span>
          </h1>
          <p className="mt-3 text-sm sm:text-base text-gray-300 max-w-2xl mx-auto">
            Have questions about Army Nexus? Our command center is ready to assist you.
          </p>
        </div>
      </section>

      {/* Contact content */}
      <section className="px-4 sm:px-6 py-10 sm:py-12 lg:py-14 reveal reveal-up">
        <div className="mx-auto max-w-6xl space-y-10 sm:space-y-12">
          {/* Success / error alerts */}
          {(status.success || status.error) && (
            <div className="max-w-3xl mx-auto w-full">
              {status.success && (
                <div className="mb-4 rounded-md border border-army-olive/60 bg-surface-dark px-4 py-3 text-sm text-army-oliveLight shadow-md transition-all duration-300">
                  <div className="flex items-start gap-2">
                    <span className="mt-0.5 h-2 w-2 rounded-full bg-army-olive" />
                    <p>{status.success}</p>
                  </div>
                </div>
              )}

              {status.error && (
                <div className="mb-4 rounded-md border border-red-700 bg-red-900/40 px-4 py-3 text-sm text-red-100 shadow-md transition-all duration-300">
                  <p>{status.error}</p>
                </div>
              )}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] gap-6 lg:gap-8 items-start">
            {/* Form card */}
            <div className="card-hover">
              <div className="flex items-center gap-2 mb-1">
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-army-primary/60 text-army-sand">
                  <MessageIcon className="w-4 h-4" />
                </div>
                <h2 className="text-lg sm:text-xl font-semibold text-army-sand">
                  Send a Message
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-gray-400 mb-5">
                Share your inquiry, and our operations team will respond with mission‑ready detail.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    value={form.message}
                    onChange={handleChange}
                    className="input-field resize-y min-h-[140px]"
                    placeholder="How can we help you?"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full sm:w-auto disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>

            {/* Contact info column */}
            <div className="space-y-4 sm:space-y-5">
              <h2 className="text-base sm:text-lg font-semibold text-army-sand mb-2">
                Contact Information
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mb-3">
                Reach out through any of the following channels for immediate assistance.
              </p>

              <div className="space-y-3">
                <div className="card-hover flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-md bg-army-primary/60 border border-army-olive/50 text-army-sand">
                    <MailIcon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                      Email
                    </p>
                    <p className="text-sm text-army-sand">commandindia@armynexus.mil</p>
                  </div>
                </div>

                <div className="card-hover flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-md bg-army-primary/60 border border-army-olive/50 text-army-sand">
                    <PhoneIcon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                      Phone
                    </p>
                    <p className="text-sm text-army-sand">+91 6204627274 ARMY‑NXS</p>
                  </div>
                </div>

                <div className="card-hover flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-md bg-army-primary/60 border border-army-olive/50 text-army-sand">
                    <LocationIcon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                      Headquarters
                    </p>
                    <p className="text-sm text-army-sand">Vadodara, Gujarat</p>
                  </div>
                </div>

                {/* Location card placeholder */}
                <div className="card-hover mt-4 h-32 sm:h-40 flex flex-col items-center justify-center text-center">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
                    Secure Location
                  </p>
                  <p className="text-sm text-gray-300">Operational coordinates classified.</p>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ section */}
          <div className="pt-4 sm:pt-6 border-t border-army-primary/40">
            <div className="mx-auto max-w-4xl text-center mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-army-sand">
                Frequently Asked Questions
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-gray-400">
                Quick answers to common inquiries.
              </p>
            </div>
            <div className="mx-auto max-w-4xl space-y-3 sm:space-y-4">
              {faqs.map((item) => (
                <div
                  key={item.question}
                  className="card-hover text-left px-4 sm:px-5 py-3.5 sm:py-4"
                >
                  <p className="text-sm sm:text-base font-semibold text-army-sand">
                    {item.question}
                  </p>
                  <p className="mt-1 text-xs sm:text-sm text-gray-400 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
    </ScrollReveal>
  )
}
