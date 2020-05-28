import React from 'react';
import { useSelector } from "react-redux";

const ChartFirstPage = (props) => {
  let displayFirstPage = useSelector(state => state.displayFirstPage);

  return (
    // <div className={(displayFirstPage == 'show') ? (displayFirstPage) : props.props}>
    <div className={props.props}>
       <div className='chart-first-page'>
         
          <div 
            className="title-left">
              <div>
                <p
                  data-aos="fade-right" 
                  data-aos-offset="200"
                  data-aos-delay="50"
                  data-aos-duration="1000"
                  data-aos-easing="ease-in-out">
                  Evolution of Covid-19 cases
                </p>
              </div>
              <div data-aos="fade-up"
                  data-aos-offset="200"
                  data-aos-delay="500"
                  data-aos-duration="1000">
                <svg
               
                  className="icon-barchart" 
                  xmlns="http://www.w3.org/2000/svg" 
                  xmlnsXlink="http://www.w3.org/1999/xlink" 
                  version="1.1" id="Capa_1" x="0px" y="0px" 
                  viewBox="0 0 512 512" 
                  style={{enableBackground:"new 0 0 512 512", transition: "inherit", transform: "rotate(90deg);transform: scale(0.3)"}}
                >
                  <path style={{fill:"#ED1C24"}} d="M419.672,390.295h67.148v75.541h-67.148V390.295z" />
                  <path style={{fill:"#F68B1F"}} d="M318.951,297.967h67.148v167.869h-67.148V297.967z"/>
                  <path style={{fill:"#F15A22"}} d="M218.229,339.934h67.148v125.902h-67.148V339.934z"/>
                  <path style={{fill:"#F68B1F"}} d="M117.508,197.246h67.148v268.59h-67.148V197.246z"/>
                  <path style={{fill:"#FDB913"}} d="M16.787,79.738h67.148v386.098H16.787V79.738z"/>
                </svg>
              </div>
          </div>
          <div className="title-right">
            <div 
              data-aos="fade-left" 
              data-aos-duration="1000"
              >
              <p>Press one of the buttons bellow</p>
            </div>
            <div
              className="text-scroll"
              data-aos="fade-left"
              data-aos-delay="500"
              data-aos-duration="1500"
              >
              <p>Or scroll for more charts</p>
            </div>
           <div data-aos="zoom-in"
           className="mouse-scroll"></div>
          </div>
        </div>
    </div>
  )
}

export default ChartFirstPage;