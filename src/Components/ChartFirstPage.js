import React, {useEffect} from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';

const ChartFirstPage = (props) => {

  return (
    <div className={props.props}>
       <div className='chart-first-page'>
          <div 
            data-aos="fade-right" 
            className="title-left">
            <p
              data-aos-offset="200"
              data-aos-delay="50"
              data-aos-duration="1500">
              Evolution of Covid-19 cases
            </p>
            <svg
              data-aos-offset="700"
              data-aos-delay="500"
              data-aos-duration="1500"
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
          <div data-aos="fade-left" data-aos-duration="2000" className="title-right">
           <p>Press one of the buttons bellow</p>
           <p>Or scroll for more charts</p>
           <div className="mouse-scroll mr-4"></div>
          </div>
        </div>
    </div>
  )
}

export default ChartFirstPage;