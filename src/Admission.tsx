import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

const courses = [
  'Pharmaceutics',
  'Pharmaceutical chemestry',
  'Pharmacology',
  'Pharmacogonosy',
  'Pharamaceutical Analysis',
  
];

const Admission: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    emailjs
      .sendForm(
        'service_6tpqcv9',         // ✅ Replace with your EmailJS service ID
        'template_j33aoye',        // ✅ Replace with your EmailJS template ID
        formRef.current!,
        '0f_ptC1pgHG0M4zeE'        // ✅ Replace with your EmailJS public key
      )
      .then(
        () => {
          alert('Admission Form Submitted Successfully!');
          setFormData({ name: '', email: '', phone: '', course: '' });
        },
        () => {
          alert('Failed to submit form. Please try again later.');
        }
      );
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-sky-100 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md transition transform hover:scale-[1.01] hover:shadow-indigo-200">
        <h2 className="text-3xl font-bold text-indigo-600 text-center mb-6">Admission Form</h2>
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
          {/* Hidden fields for EmailJS */}
          <input type="hidden" name="from_name" value={formData.name} />
          <input type="hidden" name="from_email" value={formData.email} />
          <input type="hidden" name="message" value={`Phone: ${formData.phone}, Course: ${formData.course}`} />

          <div>
            <label className="block text-sm font-semibold text-gray-700">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              pattern="[0-9]{10}"
              maxLength={10}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="10-digit mobile number"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">Select Course</label>
            <select
              name="course"
              value={formData.course}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              <option value="" disabled>Select a course</option>
              {courses.map((course, idx) => (
                <option key={idx} value={course}>{course}</option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-xl font-semibold transition duration-300"
          >
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
};

export default Admission;
