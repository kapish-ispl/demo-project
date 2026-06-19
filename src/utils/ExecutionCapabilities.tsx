import React, { useEffect, useMemo, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Capability {
  id: string;
  title: string;
  children: React.ReactNode;
  imgsrc: string;
  alignment: 'is-right' | 'is-left';
}

interface ExecutionCapabilitiesProps { data?: any; props?: any; }

const ExecutionCapabilities: React.FC<ExecutionCapabilitiesProps> = ({ data: dataProp, props }) => {

  const sectionRef = useRef<HTMLDivElement>(null);

  const slides = useMemo(() => {
    if (!dataProp) return [];

    return React.Children.toArray(dataProp)
      .filter(
        (child): child is React.ReactElement<Capability> =>
          React.isValidElement(child) &&
          typeof (child.props) !== "undefined"
      )
      .map((child, index) => ({
        id: index + 1,
        imgsrc: child.props.imgsrc,
        title: child.props.title,
        description: child.props.children,
        alignment: child.props.alignment,
      }));
  }, [dataProp]);


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

  return (
    <section className="capabilities-section bg-secondry-a-50" ref={sectionRef}>
      <div className="container cus-container">
        <div className="col-12 col-md-6">
          <div className="c-content-20 clr-text mb-4 ls-1-2 text-uppercase ft_medium clr-white">{props?.subtitle}</div>
          <h2 className="c-heading-60 lh_1-2 ft_medium clr-white">{props?.title}</h2>
        </div>
        <div className="flex-layout">
          {slides && slides.length > 0 && slides.map((item) => (
            <div key={item.id} className={`step_wrapper ${item.alignment}`}>
              <div className="step_content">
                <div className="step_image-wrap">
                  <img src={item.imgsrc} alt={item.title} className="parallax-image" />
                </div>
                <div className="step_info">
                  <div className="step_info__float">
                    <span className="step_number c-content-24 ft_light clr-white fade-move" style={{ marginBottom: "12px" }}>0{item.id}</span>
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