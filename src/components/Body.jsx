import React from 'react';
import videoSrc from './vid.mp4';

function Body() {
  // Function to handle WhatsApp chat redirect
  const handleWhatsAppChat = () => {
    // Replace the number with the astrologer's WhatsApp number in international format
    window.open('https://wa.me/+918921451177', '_blank');
  };

  return (
    <div>
      <section className="hero-section text-center p-5 bg-hero text-ivory">
        <h1 className="display-4 mb-4">Explore Your Future with Astrology</h1>
        <p className="lead mb-5">
          Get personalized insights into your future with our expert astrology services.
        </p>
        <div className="d-flex justify-content-center flex-wrap">
          <button className="btn btn-olive-green mx-2 mb-3" onClick={handleWhatsAppChat}>
            <i className="fas fa-comments mr-2"></i>Chat with Astrologer
          </button>
          <a href="tel:+918921451177" className="btn btn-golden-yellow mx-2 mb-3">
            <i className="fas fa-phone-alt mr-2"></i>Call Astrologer Now
          </a>
        </div>
      </section>
      <div className="vid">
        <video autoPlay loop muted className="embed-responsive-item">
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}

export default Body;
