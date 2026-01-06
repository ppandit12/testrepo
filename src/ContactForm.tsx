import React, { useState } from 'react';

// Backend API URL - deployed Vercel backend
const API_URL = "https://backendtest1-psi.vercel.app/api/contact";

interface FormData {
  name: string;
  email: string;
  phone: string;
  companyName: string;
  website: string;
  serviceCategory: string;
  packageTier: string;
  budgetRange: string;
  preferredCallTime: string;
  captcha: string;
}

function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    companyName: '',
    website: '',
    serviceCategory: '',
    packageTier: '',
    budgetRange: '',
    preferredCallTime: '',
    captcha: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    // CAPTCHA CHECK - 2 + 2 = 4
    if (Number(formData.captcha) !== 4) {
      setSubmitStatus('error');
      setErrorMessage('Wrong captcha answer. Please try again.');
      setIsSubmitting(false);
      return;
    }

    // Prepare data without captcha for submission
    const { captcha, ...submitData } = formData;

    try {
      // Call backend API which will forward to n8n webhook
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      });

      if (!res.ok) throw new Error('Failed');

      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        companyName: '',
        website: '',
        serviceCategory: '',
        packageTier: '',
        budgetRange: '',
        preferredCallTime: '',
        captcha: ''
      });
    } catch (err) {
      console.error(err);
      setSubmitStatus('error');
      setErrorMessage('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 flex items-center justify-center p-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-violet-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
      </div>

      <div className="relative w-full max-w-2xl">
        {/* Glass card */}
        <div className="backdrop-blur-xl bg-white/10 rounded-3xl shadow-2xl border border-white/20 p-8 md:p-12">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent mb-3">
              Contact Us
            </h1>
            <p className="text-gray-300 text-lg">Get in touch with our team for your next project</p>
          </div>

          {/* Success/Error Messages */}
          {submitStatus === 'success' && (
            <div className="mb-6 p-4 bg-emerald-500/20 border border-emerald-500/50 rounded-xl text-emerald-300 text-center">
              ✓ Message sent successfully! We'll contact you soon.
            </div>
          )}
          {submitStatus === 'error' && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-300 text-center">
              ✕ {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div className="group">
              <label className="block text-sm font-medium text-gray-300 mb-2">Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 hover:bg-white/10"
                placeholder="Enter the Name"
              />
            </div>

            {/* Email */}
            <div className="group">
              <label className="block text-sm font-medium text-gray-300 mb-2">Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 hover:bg-white/10"
                placeholder="Enter the Email"
              />
            </div>

            {/* Phone */}
            <div className="group">
              <label className="block text-sm font-medium text-gray-300 mb-2">Phone (WhatsApp enabled) *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 hover:bg-white/10"
                placeholder="Enter the Phone no which has WhatsApp account"
              />
            </div>

            {/* Company Name */}
            <div className="group">
              <label className="block text-sm font-medium text-gray-300 mb-2">Company Name *</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 hover:bg-white/10"
                placeholder="Enter the Company Name"
              />
            </div>

            {/* Website */}
            <div className="group">
              <label className="block text-sm font-medium text-gray-300 mb-2">Website (optional)</label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 hover:bg-white/10"
                placeholder="Enter your website URL"
              />
            </div>

            {/* Service Category */}
            <div className="group">
              <label className="block text-sm font-medium text-gray-300 mb-2">Service Category *</label>
              <select
                name="serviceCategory"
                value={formData.serviceCategory}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 hover:bg-white/10 cursor-pointer appearance-none"
                style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%239ca3af' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.75rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em' }}
              >
                <option value="" className="bg-slate-900">Select the service</option>
                <option value="Marketing" className="bg-slate-900">Marketing</option>
                <option value="AI Automation" className="bg-slate-900">AI Automation</option>
                <option value="Web/App Dev" className="bg-slate-900">Web/App Dev</option>
                <option value="Blockchain" className="bg-slate-900">Blockchain</option>
                <option value="Custom" className="bg-slate-900">Custom</option>
              </select>
            </div>

            {/* Package Tier */}
            <div className="group">
              <label className="block text-sm font-medium text-gray-300 mb-2">Package Tier *</label>
              <select
                name="packageTier"
                value={formData.packageTier}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 hover:bg-white/10 cursor-pointer appearance-none"
                style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%239ca3af' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.75rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em' }}
              >
                <option value="" className="bg-slate-900">Select a package</option>
                <option value="Basic" className="bg-slate-900">Basic</option>
                <option value="Growth" className="bg-slate-900">Growth</option>
                <option value="Scale" className="bg-slate-900">Scale</option>
                <option value="Enterprise" className="bg-slate-900">Enterprise</option>
              </select>
            </div>

            {/* Budget Range */}
            <div className="group">
              <label className="block text-sm font-medium text-gray-300 mb-2">Budget Range *</label>
              <input
                type="text"
                name="budgetRange"
                value={formData.budgetRange}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 hover:bg-white/10"
                placeholder="Enter the Budget"
              />
            </div>

            {/* Preferred Call Time */}
            <div className="group">
              <label className="block text-sm font-medium text-gray-300 mb-2">Preferred Call Time *</label>
              <select
                name="preferredCallTime"
                value={formData.preferredCallTime}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 hover:bg-white/10 cursor-pointer appearance-none"
                style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%239ca3af' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.75rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em' }}
              >
                <option value="" className="bg-slate-900">Select time</option>
                <option value="Morning (9 AM - 12 PM)" className="bg-slate-900">Morning (9 AM - 12 PM)</option>
                <option value="Afternoon (12 PM - 5 PM)" className="bg-slate-900">Afternoon (12 PM - 5 PM)</option>
                <option value="Evening (5 PM - 8 PM)" className="bg-slate-900">Evening (5 PM - 8 PM)</option>
              </select>
            </div>

            {/* Captcha */}
            <div className="group">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Security Check: What is 2 + 2? *
              </label>
              <input
                type="number"
                name="captcha"
                value={formData.captcha}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 hover:bg-white/10"
                placeholder="Enter your answer"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-6 bg-gradient-to-r from-indigo-600 via-violet-600 to-blue-600 hover:from-indigo-500 hover:via-violet-500 hover:to-blue-500 text-white font-semibold text-lg rounded-xl shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Submitting...
                </span>
              ) : (
                'Send Message →'
              )}
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-gray-500 text-sm mt-8">
            🔒 Your information is secure and will never be shared
          </p>
        </div>
      </div>
    </div>
  );
}

export default ContactForm;
