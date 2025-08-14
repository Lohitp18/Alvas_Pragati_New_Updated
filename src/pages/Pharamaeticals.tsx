import React, { useState } from "react";

interface Company {
  id: number;
  name: string;
  jobDescription: string;
  vacancies: number;
}

const companies: Company[] = [
  { id: 1, name: "Apple Inc.", jobDescription: "Frontend Developer (React)", vacancies: 3 },
  { id: 2, name: "Microsoft Corporation", jobDescription: "Backend Developer (Node.js)", vacancies: 5 },
  { id: 3, name: "Amazon.com Inc.", jobDescription: "Full Stack Developer", vacancies: 4 },
  { id: 4, name: "Google LLC", jobDescription: "Data Analyst", vacancies: 2 },
];

export default function CompanyRegistrationPage() {
  const [selectedCompanies, setSelectedCompanies] = useState<number[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", email: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleCheckboxChange = (id: number) => {
    setSelectedCompanies((prev) =>
      prev.includes(id) ? prev.filter((cid) => cid !== id) : [...prev, id]
    );
  };

  const handleRegisterClick = () => {
    if (selectedCompanies.length > 0) {
      setShowForm(true);
    } else {
      alert("Please select at least one company before registering.");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setShowForm(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 mt-32">
      <h1 className="text-2xl font-bold mb-4">Company Job Listings</h1>
      <div className="space-y-4">
        {companies.map((company) => (
          <div
            key={company.id}
            className="border p-4 rounded-lg flex items-center justify-between"
          >
            <div>
              <h2 className="text-lg font-semibold">{company.name}</h2>
              <p className="text-gray-600">{company.jobDescription}</p>
              <p className="text-sm text-gray-500">
                Vacancies: {company.vacancies}
              </p>
            </div>
            <input
              type="checkbox"
              checked={selectedCompanies.includes(company.id)}
              onChange={() => handleCheckboxChange(company.id)}
              className="w-5 h-5"
            />
          </div>
        ))}
      </div>

      {!showForm && !submitted && (
        <button
          onClick={handleRegisterClick}
          className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Register
        </button>
      )}

      {showForm && !submitted && (
        <form onSubmit={handleSubmit} className="mt-6 space-y-4 border p-4 rounded-lg">
          <h2 className="text-lg font-semibold">Enter Your Details</h2>
          <input
            type="text"
            placeholder="Full Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="email"
            placeholder="Email ID"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full border p-2 rounded"
            required
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
          >
            Submit
          </button>
        </form>
      )}

      {submitted && (
        <div className="mt-6 p-4 bg-green-100 text-green-800 rounded-lg">
          ✅ Registration successfully completed!
        </div>
      )}
    </div>
  );
}
