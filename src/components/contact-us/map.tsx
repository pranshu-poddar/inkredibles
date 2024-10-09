import React from "react";

const Map = () => {
  return (
    <div>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7547.184984049072!2d72.82580467301366!3d18.94942339456675!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7cf6a78547353%3A0x67008c80681541af!2sMoolji%20Jaitha%20Market%20(MJ%20Market)!5e0!3m2!1sen!2sin!4v1728475777307!5m2!1sen!2sin&zoom=18"
        className="border-none w-full h-[30rem]"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default Map;
