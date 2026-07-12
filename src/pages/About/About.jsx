import { motion } from 'framer-motion';
import { Target, Eye, BookOpen, Settings, Building2 } from 'lucide-react';

function Section({ icon: Icon, title, children, delay = 0 }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay }} className="bg-white rounded-2xl shadow-lg p-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
          <Icon size={20} className="text-primary" />
        </div>
        <h3 className="text-xl font-bold text-dark">{title}</h3>
      </div>
      <div className="text-slate-600 leading-relaxed space-y-3">{children}</div>
    </motion.div>
  );
}

export default function About() {
  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-dark">About IIC</h1>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Learn about the Institution's Innovation Council and our mission to foster innovation across campus.
          </p>
        </motion.div>

        <div className="space-y-8">
          <Section icon={BookOpen} title="About IIC" delay={0}>
            <p>The Institution's Innovation Council (IIC) is a flagship initiative established by the Ministry of Education's Innovation Cell (MIC) at our institution. The IIC serves as a nodal center for promoting innovation, entrepreneurship, and creative problem-solving among students and faculty.</p>
            <p>Our council brings together a diverse community of thinkers, makers, and leaders who are committed to driving positive change through technology and innovation.</p>
          </Section>

          <Section icon={Target} title="Vision" delay={0.1}>
            <p>To create a vibrant ecosystem of innovation and entrepreneurship that empowers every student to become a creative problem-solver and change-maker in society.</p>
          </Section>

          <Section icon={Eye} title="Mission" delay={0.15}>
            <ul className="list-disc list-inside space-y-2">
              <li>Foster a culture of innovation and creative thinking across the campus</li>
              <li>Provide resources and mentorship to transform ideas into viable solutions</li>
              <li>Facilitate collaboration between students, faculty, and industry</li>
              <li>Organize workshops, hackathons, and competitions to nurture skills</li>
              <li>Support students in patenting and commercializing their innovations</li>
            </ul>
          </Section>

          <Section icon={Settings} title="Objectives" delay={0.2}>
            <ul className="list-disc list-inside space-y-2">
              <li>To conduct ideation, problem-solving, and innovation-related activities</li>
              <li>To create a network of innovators within the institution</li>
              <li>To organize training programs on design thinking and IP management</li>
              <li>To facilitate prototype development and testing</li>
              <li>To promote entrepreneurship among students</li>
              <li>To establish strong industry-academia linkages</li>
            </ul>
          </Section>

          <Section icon={Building2} title="Institution Details" delay={0.25}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="font-semibold text-dark">Institution Name</p>
                <p>Your Institution Name</p>
              </div>
              <div>
                <p className="font-semibold text-dark">Location</p>
                <p>City, State, India</p>
              </div>
              <div>
                <p className="font-semibold text-dark">IIC Established</p>
                <p>Academic Year 2018-19</p>
              </div>
              <div>
                <p className="font-semibold text-dark">IIC Category</p>
                <p>Category 1</p>
              </div>
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}
