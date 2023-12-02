'use client'
/* eslint-disable @next/next/no-img-element */
import { AboutUsAssets } from '@/constants/assets.constant';
import React, { useEffect, useRef, useState } from 'react';

const Skills = () => {
  const skills: { [key: string]: number } = { a: 60, b: 90, c: 70, d: 80 };
  const width = "w-[60%] w-[90%] w-[70%] w-[80%]";

  // State to manage the visibility of the component
  const [visible, setVisible] = useState(false);

  // Ref to the element being observed
  const skillsRef = useRef(null);

  // Intersection Observer setup
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1, // Trigger when at least 50% of the element is visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target); // Stop observing once visible
        }
      });
    }, options);

    if (skillsRef.current) {
      observer.observe(skillsRef.current);
    }

  }, []);

  return (
    <div className='container2 pt-24' ref={skillsRef}>
      <div className='flex max-lg:flex-col-reverse px-10 gap-8 justify-between'>
        <div className='w-3/5'>
          <h2 className='text-2xl'>We have skills to show</h2>
          <div className='grid gap-4 mt-6'>
            {Object.keys(skills).map((skill) => (
              <div key={skill} className='flex items-center'>
                <div className='rounded-full z-10  bg-inkredible-black text-white border-2 w-10 h-10 flex justify-center items-center text-sm border-orange-600'>{skills[skill]}%</div>
                <div className='w-full relative rounded-md overflow-hidden -ml-2 h-4 bg-gray-200'>
                  <span className={`absolute inset-0 object-cover bg-orange-600 transition-all duration-1000 ease-out ${visible ? `w-[${skills[skill]}%]` : "w-0"}`}></span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className=''>
          <img src={AboutUsAssets.SkillsBanner} alt='skills banner' />
        </div>
      </div>
    </div>
  );
};

export default Skills;
