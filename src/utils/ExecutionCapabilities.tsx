import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Capability {
  id: string;
  title: string;
  description: string;
  image: string;
  alignment: 'is-right' | 'is-left';
}

const ExecutionCapabilities: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const steps = gsap.utils.toArray<HTMLElement>('.step_wrapper');

      steps.forEach((step) => {
        const imgWrap = step.querySelector('.step_image-wrap') as HTMLElement;
        const img = step.querySelector('.parallax-image') as HTMLImageElement;
        const textElements = step.querySelectorAll('.fade-move');

        // 1. Smooth Clip-Path Reveal
        gsap.fromTo(imgWrap,
          { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0 },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            opacity: 1,
            duration: 1.8,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: step,
              start: 'top 80%',
            }
          }
        );

        // 2. Parallax Effect with Scale
        gsap.fromTo(img,
          { scale: 1.2, yPercent: -10 },
          {
            scale: 1,
            yPercent: 10,
            ease: 'none',
            scrollTrigger: {
              trigger: imgWrap,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.5,
            }
          }
        );

        // 3. Staggered Text Reveal
        gsap.fromTo(textElements,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: step,
              start: 'top 85%',
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const data: Capability[] = [
    {
      id: '01',
      title: 'Civil & Structural Execution',
      description: 'Large-scale concreting, structural erection, and industrial foundation works executed within active plant environments.',
      image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?q=80&w=2069',
      alignment: 'is-right' // First image right aligned
    },
    {
      id: '02',
      title: 'Mechanical Installation',
      description: 'Erection and integration of heavy equipment, material handling systems, and plant infrastructure components.',
      image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?q=80&w=2070',
      alignment: 'is-left' // Second image left aligned
    },
    {
      id: '03',
      title: 'Electrical & Instrumentation',
      description: 'Installation and commissioning support across electrical, automation, and control systems.',
      image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?q=80&w=2069',
      alignment: 'is-right'
    },
    {
      id: '04',
      title: 'Workforce & Equipment Mobilisation',
      description: 'Deployment of experienced teams and heavy equipment fleets to support high-value infrastructure programs.',
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070',
      alignment: 'is-left'
    }
  ];

  return (
    <section className="capabilities-section bg-secondry" ref={sectionRef}>
      <div className="container cus-container">
        <div className="flex-layout">
          {data.map((item) => (
            <div key={item.id} className={`step_wrapper ${item.alignment}`}>
              <div className="step_content">
                <div className="step_image-wrap">
                  <img src={item.image} alt={item.title} className="parallax-image" />
                </div>
                <div className="step_info">
                  <div className="step_info__float">
                    <span className="step_number c-content-24 ft_light clr-white fade-move">{item.id}</span>
                    <h3 className="step_title c-heading-48 lh_1-1 clr-white ft_regular fade-move">{item.title}</h3>

                  </div>
                  <p className="step_description c-content-24 clr-white ft_light lh_1-6 fade-move">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExecutionCapabilities;