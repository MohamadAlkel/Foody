import '../styles/navbar.css';
import '../styles/ex.css';
import Cert from '../styles/img/cert.png'
import React from 'react';
import { Progress } from 'reactstrap';
  
  
  export default class Navbars extends React.Component {

    render() {
      
      return (
        <>
          <div className=" row topSpaceEx">
            <div className="col-xl-6 leftSpace">

              <div className="row">
                <h1 className="textTitle">Experience & Education</h1>
              </div>

              <div className="row">
              
                  <div className="leftspaceTwo">

                    <div className="ex">
                      <p className="exText">
                        Full-Stack developer at NEXT Academy | Mar 2019 – May 2019 |
                        <p className="exTextOne">Kuala Lumpur, Malaysia</p>
                      </p>
                    </div>

                    <div className="ex">
                      <p className="exText">
                      Freelance Web Developer | Nov 2017 – Present |
                        <p className="exTextOne">Kuala Lumpur, Malaysia</p>
                      </p>
                    </div>

                    <div className="ex">
                      <p className="exText">
                        UI UX Designer at -99 Design Studio| May 2017 – Oct 2018 |
                        <p className="exTextOne">Kuala Lumpur, Malaysia</p>
                      </p>
                    </div>

                    <div className="ex">
                      <p className="exText">
                        Architect Trainer | Nov 2017 – Apr 2018 |
                        <p className="exTextOne">Kuala Lumpur, Malaysia</p>
                      </p>               
                    </div>

                  </div>

              </div>

              <div className="row">

                <div className="col-xl-3 delete">
                  <div className="certs">                 
                      <p className="certText">
                        <b>
                        <img height="20px"  src={Cert} alt="img" /> Full-Stack developer
                        </b> <br/> 
                        from Next Academy
                      </p>                          
                  </div>
                </div>
                
                <div className="col-xl-3 delete">
                  <div className="certs">                 
                      <p className="certText">
                        <b>
                        <img height="20px"  src={Cert} alt="img" /> Front End Developer 
                        </b> <br/> 
                        from Udacity
                      </p>                          
                  </div>
                </div>

                <div className="col-xl-3 delete">
                  <div className="certs">                 
                      <p className="certText">
                        <b>
                        <img height="20px"  src={Cert} alt="img"/> Training in HTML & CSS
                        </b> <br/> 
                        from New Horizons
                      </p>                          
                  </div>
                </div>

                <div className="col-xl-3 delete">
                  <div className="certs">                 
                      <p className="certText">
                        <b>
                        <img height="20px"  src={Cert} alt="img" /> B.S. Architectural 
                        </b> <br/> 
                        from YPU
                      </p>                          
                  </div>
                </div>                
                
              </div>

            </div>


            <div className="col-xl-1 leftSpace "><div className="borders"></div></div>

            <div className="col-xl-2 leftSpace borders">
              <div className="row">
                <h1 className="textTitle">Skills</h1>
              </div>

              <div className="leftSpace">
              <div className="skills ">
                <h1 className="skillsText">HTML</h1><br/>
                <Progress className="skillsValue" value="95"></Progress>
              </div>
              <div className="skills">
                <h1 className="skillsText">CSS</h1><br/>
                <Progress className="skillsValue" value="93"></Progress>
              </div>
              <div className="skills">
                <h1 className="skillsText">JS/ES6</h1><br/>
                <Progress className="skillsValue" value="80"></Progress>
              </div>
              <div className="skills">
                <h1 className="skillsText">ReactJS</h1><br/>
                <Progress className="skillsValue" value="95"></Progress>
              </div>
              <div className="skills">
                <h1 className="skillsText">Python</h1><br/>
                <Progress className="skillsValue" value="75"></Progress>
              </div>
              <div className="skills">
                <h1 className="skillsText">Flask</h1><br/>
                <Progress className="skillsValue" value="75"></Progress>
              </div>
              <div className="skills">
                <h1 className="skillsText">Reactstrap</h1><br/>
                <Progress className="skillsValue" value="90"></Progress>
              </div>
              <div className="skills">
                <h1 className="skillsText">npm</h1><br/>
                <Progress className="skillsValue" value="70"></Progress>
              </div>
              </div>
              

            </div>

            <div className="col-xl-2 ml-5 topspaceTwo">

              <div className="skills ">
                <h1 className="skillsText">SQL</h1><br/>
                <Progress className="skillsValue" value="85"></Progress>
              </div>
              <div className="skills">
                <h1 className="skillsText">SQLite</h1><br/>
                <Progress className="skillsValue" value="50"></Progress>
              </div>
              <div className="skills">
                <h1 className="skillsText">PostgreSQL</h1><br/>
                <Progress className="skillsValue" value="80"></Progress>
              </div>
              <div className="skills">
                <h1 className="skillsText">JSON</h1><br/>
                <Progress className="skillsValue" value="90"></Progress>
              </div>
              <div className="skills">
                <h1 className="skillsText">API</h1><br/>
                <Progress className="skillsValue" value="90"></Progress>
              </div>
              <div className="skills">
                <h1 className="skillsText">Git</h1><br/>
                <Progress className="skillsValue" value="75"></Progress>
              </div>
              <div className="skills">
                <h1 className="skillsText">Responsive Web</h1><br/>
                <Progress className="skillsValue" value="90"></Progress>
              </div>
              <div className="skills">
                <h1 className="skillsText">Adobe XD</h1><br/>
                <Progress className="skillsValue" value="95"></Progress>
              </div>

            </div>
  
          </div>
        </>
      );
    }
  }