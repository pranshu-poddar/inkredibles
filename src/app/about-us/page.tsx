import Counter from '@/components/about-us/counter';
import Intro from '@/components/about-us/intro';
import Skills from '@/components/about-us/skills';
import React from 'react';

const AboutUs = () => {
    return (
        <>
            <Intro />
            <Counter />
            <Skills/>
        </>
    );
};

export default AboutUs;