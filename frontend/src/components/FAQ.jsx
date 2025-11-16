import React, { useEffect, useRef, useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';

const faqs = [
  {
    question: "How does HireLoop's AI screening work?",
    answer: "Our AI analyzes resumes, cover letters, and assessment responses using natural language processing and machine learning to match candidates with job requirements. It evaluates technical skills, experience, and culture fit to provide objective rankings.",
  },
  {
    question: "Can I integrate HireLoop with my existing ATS?",
    answer: "Yes! HireLoop integrates seamlessly with popular ATS platforms like Greenhouse, Workday, SAP, and more. We also offer API access for custom integrations.",
  },
  {
    question: "What types of assessments can I create?",
    answer: "You can create coding tests (20+ languages), aptitude tests, personality assessments, video interviews, case studies, and custom skill evaluations. All tests are customizable to your specific needs.",
  },
  {
    question: "Is HireLoop suitable for campus hiring?",
    answer: "Absolutely! Our Campus Hiring module is specifically designed for high-volume recruitment. It includes bulk candidate management, automated scheduling, batch processing, and streamlined evaluation tools.",
  },
  {
    question: "How secure is candidate data?",
    answer: "We take security seriously. HireLoop is SOC 2 certified, GDPR compliant, and follows ISO 27001 standards. All data is encrypted in transit and at rest, with regular security audits.",
  },
  {
    question: "What kind of support do you provide?",
    answer: "We offer email support for all plans, priority support for Professional plans, and dedicated account managers for Enterprise customers. We also provide comprehensive documentation and training resources.",
  },
  {
    question: "Can I try HireLoop before committing?",
    answer: "Yes! We offer a 14-day free trial with no credit card required. You'll have access to all features so you can experience the platform fully before making a decision.",
  },
];

export default function FAQ() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="relative bg-white" aria-labelledby="faq-heading">
      <div ref={ref} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className={`text-center mb-8 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <h2 id="faq-heading" className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 -mt-12">Enterprise Integration Frequently Asked <span className='text-orange-400'>Questions</span></h2>
          <p className="text-gray-600 text-lg">Got questions? We've got answers</p>
        </div>

        <div className={`transition-opacity duration-700 ${visible ? 'opacity-100' : 'opacity-0'}`}>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="bg-gray-50 rounded-xl px-6 border border-gray-200">
                <div className="flex items-center justify-between py-4">
                  <AccordionTrigger className="w-full text-left text-gray-900 font-medium">
                    <span>{faq.question}</span>
                  </AccordionTrigger>
                </div>
                <AccordionContent className="pb-4 text-gray-600">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
