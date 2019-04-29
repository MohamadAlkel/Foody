import React, { Component } from 'react';
import { Card, Button, CardImg, CardTitle, CardColumns,
    CardSubtitle, CardBody } from 'reactstrap';
import '../styles/profile.css';
import '../styles/Portfolio.css';
import wedo from '../styles/img/wedo.png'
import wush from '../styles/img/wush.jpg'
import Jubba from '../styles/img/Jubba.jpg'
import IPLACE from '../styles/img/IPLACE.jpg'
import laz from '../styles/img/laz.jpg'
import GLLERY from '../styles/img/GLLERY.jpg'
import YUMMY from '../styles/img/YUMMY.jpg'
import pro from '../styles/img/pro.jpg'




class Profile extends Component {    

  render() {
    return (
    <div>
      
      <CardColumns  className="topSpace ml-4 mr-4">

      <Card className=" color ">
      <div className="row">
        <div className="col-xl-8 pr-0">
            <div className="imgCard ">
                <CardImg className="border" top  src={wedo} alt="Card image cap" />
            </div>
        </div>
        <div className="col-xl-4 pl-0 pr-1">
            <CardBody>
            <CardTitle className="top"> | Wedo </CardTitle>
            <CardSubtitle className="textCard pl-3 mt-2"> UI UX Design</CardSubtitle>
            
            </CardBody>
        </div>
      </div>
      <div className="row">
         <Button href="https://www.behance.net/gallery/72999029/Daily-Tasks" target="_blank"  className="btns m-3">See all Project</Button>
      </div>
      </Card>

      <Card className=" color ">
      <div className="row">
        <div className="col-xl-8 pr-0">
            <div className="imgCard ">
                <CardImg className="border" top  src={wush} alt="Card image cap" />
            </div>
        </div>
        <div className="col-xl-4 pl-0 pr-1">
            <CardBody>
            <CardTitle className="top"> | Wushoo </CardTitle>
            <CardSubtitle className="textCard pl-3 mt-2"> UI UX Design</CardSubtitle>
            
            </CardBody>
        </div>
      </div>
      <div className="row">
         <Button href="https://www.behance.net/gallery/72798271/Wushoo" target="_blank"  className="btns m-3">See all Project</Button>
      </div>
      </Card>

      <Card className=" color ">
      <div className="row">
        <div className="col-xl-8 pr-0">
            <div className="imgCard ">
                <CardImg className="border" top  src={Jubba} alt="Card image cap" />
            </div>
        </div>
        <div className="col-xl-4 pl-0 pr-1">
            <CardBody>
            <CardTitle className="top"> |  Jubba airways </CardTitle>
            <CardSubtitle className="textCard pl-3 mt-2"> UI UX Design</CardSubtitle>
            
            </CardBody>
        </div>
      </div>
      <div className="row">
         <Button href="https://www.behance.net/gallery/72807405/Redesign-Jubba-airways" target="_blank" className="btns m-3">See all Project</Button>
      </div>
      </Card>

      <Card className=" color ">
      <div className="row">
        <div className="col-xl-8 pr-0">
            <div className="imgCard ">
                <CardImg className="border" top  src={IPLACE} alt="Card image cap" />
            </div>
        </div>
        <div className="col-xl-4 pl-0 pr-1">
            <CardBody>
            <CardTitle className="top"> | IPLACE </CardTitle>
            <CardSubtitle className="textCard pl-3 mt-2"> UI UX Design</CardSubtitle>
            
            </CardBody>
        </div>
      </div>
      <div className="row">
         <Button href="https://www.behance.net/gallery/71292473/IPLACE" target="_blank" className="btns m-3">See all Project</Button>
      </div>
      </Card>

      <Card className=" color ">
      <div className="row">
        <div className="col-xl-8 pr-0">
            <div className="imgCard ">
                <CardImg className="border" top  src={laz} alt="Card image cap" />
            </div>
        </div>
        <div className="col-xl-4 pl-0 pr-1">
            <CardBody>
            <CardTitle className="top"> | LAZADA </CardTitle>
            <CardSubtitle className="textCard pl-3 mt-2"> UI UX Design</CardSubtitle>
            
            </CardBody>
        </div>
      </div>
      <div className="row">
         <Button href="https://www.behance.net/gallery/71899325/Redesign-LAZADA" target="_blank" className="btns m-3">See all Project</Button>
      </div>
      </Card>

      <Card className=" color ">
      <div className="row">
        <div className="col-xl-8 pr-0">
            <div className="imgCard ">
                <CardImg className="border" top  src={GLLERY} alt="Card image cap" />
            </div>
        </div>
        <div className="col-xl-4 pl-0 pr-1">
            <CardBody>
            <CardTitle className="top"> | MUEBLE GLLERY </CardTitle>
            <CardSubtitle className="textCard pl-3 mt-2"> UI UX Design</CardSubtitle>
            
            </CardBody>
        </div>
      </div>
      <div className="row">
         <Button href="https://www.behance.net/gallery/70379393/MUEBLE-GLLERY" target="_blank" className="btns m-3">See all Project</Button>
      </div>
      </Card>

      <Card className=" color ">
      <div className="row">
        <div className="col-xl-8 pr-0">
            <div className="imgCard ">
                <CardImg className="border" top  src={YUMMY} alt="Card image cap" />
            </div>
        </div>
        <div className="col-xl-4 pl-0 pr-1">
            <CardBody>
            <CardTitle className="top"> | YUMMY </CardTitle>
            <CardSubtitle className="textCard pl-3 mt-2"> UI UX Design</CardSubtitle>
            
            </CardBody>
        </div>
      </div>
      <div className="row">
         <Button href="https://www.behance.net/gallery/69392387/YUMMY" target="_blank"  className="btns m-3">See all Project</Button>
      </div>
      </Card>

      <Card className=" color ">
      <div className="row">
        <div className="col-xl-8 pr-0">
            <div className="imgCard ">
                <CardImg className="border" top  src={pro} alt="Card image cap" />
            </div>
        </div>
        <div className="col-xl-4 pl-0 pr-1">
            <CardBody>
            <CardTitle className="top"> | My Profile </CardTitle>
            <CardSubtitle className="textCard pl-3 mt-2"> UI UX Design</CardSubtitle>
            <CardSubtitle className="textCard pl-3 mt-2"> Front-end dev</CardSubtitle>
            
            </CardBody>
        </div>
      </div>
      <div className="row">
         <Button href="/" target="_blank" className="btns m-3">See all Project</Button>
      </div>
      </Card>      
      
    </CardColumns>
      
      </div>
    )
  }
}


export default Profile;
