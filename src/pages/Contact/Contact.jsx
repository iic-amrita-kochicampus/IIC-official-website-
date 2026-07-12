import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';
import ContactForm from '../../components/forms/ContactForm';

export default function Contact() {
  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-dark">Contact Us</h1>
          <p className="mt-4 text-lg text-slate-600">Get in touch with the Institution's Innovation Council.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                  <Mail size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-dark">Email</h3>
                  <p className="text-slate-600">iic@institution.edu</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center shrink-0">
                  <Phone size={20} className="text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold text-dark">Phone</h3>
                  <p className="text-slate-600">+91 123 456 7890</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center shrink-0">
                  <MapPin size={20} className="text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-dark">Address</h3>
                  <p className="text-slate-600">Institution Campus, City, State, India</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-64">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000!2d0!3d0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDAwJzAwLjAiTiA3NMKwMDAnMDAuMCJF!5e0!3m2!1sen!2sin!4v1" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" title="IIC Location" />
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-dark mb-6">Send a Message</h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
