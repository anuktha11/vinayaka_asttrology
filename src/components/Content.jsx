import React from 'react';

function Content() {
  return (
    <div>
      <section className="container my-5">
        <div className="row">
          <div className="col-md-6 mb-4">
            <div className="card border-0 shadow rounded">
              <div className="card-body">
                <h2 className="text-rich-maroon card-title">Astrology Insights</h2>
                <p className="text-deep-blue card-text">
                  Discover the timeless wisdom of Kerala Astrology and how it provides profound insights into our lives. 
                  Learn about the ancient techniques and interpretations that have guided countless individuals in their journey through the cosmos.
                </p>
                <ul className="list-unstyled text-deep-blue">
                  <li>Personalized Horoscope Readings</li>
                  <li>Understanding Your Birth Chart</li>
                  <li>Insights into Planetary Alignments</li>
                  <li>Guidance for Major Life Decisions</li>
                </ul>
                {/* <a href="#more-astrology" className="btn btn-golden-yellow mt-3">Learn More</a> */}
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-4">
            <div className="card border-0 shadow rounded">
              <div className="card-body">
                <h2 className="text-golden-yellow card-title">Scientific Aspects</h2>
                <p className="text-deep-blue card-text">
                  Delve into the scientific underpinnings of astrology and explore how it merges with scientific principles. 
                  Discover how historical observations and modern studies contribute to understanding astrology's role in predictive science.
                </p>
                <ul className="list-unstyled text-deep-blue">
                  <li>Historical Development of Astrology</li>
                  <li>The Role of Astronomy in Astrology</li>
                  <li>Scientific Analysis and Research</li>
                  <li>Correlation with Psychological Insights</li>
                </ul>
                {/* <a href="#more-science" className="btn btn-golden-yellow mt-3">Explore More</a> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Content;
