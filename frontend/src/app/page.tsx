'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    pickup_date: '',
    frequency: 'one-time',
    notes: '',
  });
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) setUsername(storedUsername);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('username');
    setUsername(null);
    router.push('/');
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/pickup/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error('Failed');
      const data = await response.json();
      alert('Laundry pickup scheduled!');
      console.log(data);
    } catch (err) {
      alert('There was an error scheduling pickup.');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white text-gray-800">
      {/* Navbar */}
      <nav className="w-full bg-white shadow-md flex items-center justify-between px-6 py-4 sticky top-0 z-10">
        <div className="font-bold text-blue-700 text-lg">LaundryServiceAtDoor</div>
        <div className="space-x-6 text-sm">
          <a href="#home" className="hover:text-blue-600">Home</a>
          <a href="#about" className="hover:text-blue-600">About</a>
          <a href="#contact" className="hover:text-blue-600">Contact Us</a>
        </div>
        <div className="text-sm text-blue-600 font-semibold">
          {username ? (
            <div className="flex gap-3 items-center">
              <span>Hello, {username}</span>
              <button onClick={handleLogout} className="text-red-500 hover:underline">Logout</button>
            </div>
          ) : (
            <button onClick={() => router.push('/login')} className="hover:underline">Login</button>
          )}
        </div>
      </nav>

      {/* Main Section */}
      <section id="home" className="p-6 flex flex-col md:flex-row items-start justify-center gap-10 mt-10">
        <div className="w-full md:w-1/2 flex flex-col gap-6">
          <div id="about" className="bg-white rounded-2xl shadow-md p-8 text-justify flex-1">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">About DhobiG</h2>
            <p className="text-gray-700 leading-relaxed">
              DhobiG is a modern laundry service company dedicated to making your life easier.
              We offer convenient and affordable laundry pickup and delivery right from your doorstep.
              Whether it's a one-time wash or a regular weekly schedule, DhobiG ensures your clothes are handled with care and delivered fresh and clean.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-8 text-left">
            <h2 className="text-2xl font-bold text-blue-600 mb-6">Our Services</h2>

            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Premium Laundry Service</h3>
              <p className="text-sm text-gray-700">
                For people who truly love their clothes!<br />
                Service by our Finest Certified Fabric experts with specialised services, great past reviews and multiple positive testimonials!
              </p>
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Regular Laundry Service</h3>
              <p className="text-sm text-gray-700">
                For people looking for a steal deal!<br />
                A value-for-money process that services the entire bulk load of each customer at a time by Certified Laundry Experts.
              </p>
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Dry Clean Service</h3>
              <p className="text-sm text-gray-700">
                For special fabric and "handle-with-care" items.<br />
                Service by expert drycleaners who understand the science of fabrics. Your special delicate clothes will be treated with special care.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800">RapidDG: Express Delivery</h3>
              <p className="text-sm text-gray-700">
                For people in a hurry!<br />
                One of the fastest laundry services in India! Get your clothes picked-up from your home, washed, drycleaned, ironed and back home in just 4 hours! (Limited Areas Only)
              </p>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold mb-6 text-blue-600 text-center">Schedule Laundry Pickup</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" name="name" placeholder="Name" required value={formData.name} onChange={handleChange} className="w-full border p-3 rounded-md" />
            <input type="tel" name="phone" placeholder="Phone Number" required value={formData.phone} onChange={handleChange} className="w-full border p-3 rounded-md" />
            <input type="text" name="address" placeholder="Address" required value={formData.address} onChange={handleChange} className="w-full border p-3 rounded-md" />
            <input type="date" name="pickup_date" required value={formData.pickup_date} onChange={handleChange} className="w-full border p-3 rounded-md" />
            <select name="frequency" value={formData.frequency} onChange={handleChange} className="w-full border p-3 rounded-md">
              <option value="one-time">One-Time</option>
              <option value="weekly">Weekly</option>
              <option value="bi-weekly">Bi-Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
            <textarea name="notes" placeholder="What Services do you want? (Washing, ironing, folding etc.)" rows={3} value={formData.notes} onChange={handleChange} className="w-full border p-3 rounded-md" />
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">Schedule Pickup</button>
          </form>
        </div>
      </section>

      {/* Contact Section */}
      <footer id="contact" className="bg-white p-6 mt-12 text-center shadow-inner">
        <h3 className="text-lg font-semibold text-blue-600 mb-2">Contact Us</h3>
        <p className="text-gray-700">
          📍 Chennai, TamilNadu<br />
          📞 +91 987654321<br />
          ✉️ care@laundry.com
        </p>
      </footer>
    </div>
  );
}
