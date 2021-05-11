import React, { useState, createContext, Component } from 'react';
import { countiesOfIrelandArray } from './countiesOfIrelandArray';
//import { Timer } from "./QuizComponents/Timer.js";

export class ImageMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionID: this.props.questionID,
      questionArray: countiesOfIrelandArray,
      quizLength: this.props.quizLength,
    };
  }

  render() {
    // function used to print the x and y coordinates of mouse clicks on the image to console, used in development to find coordinates
    // of each county and insert these into area tags
    // const printMousePos = (e) => {
    //   var xCoord = e.nativeEvent.offsetX;
    //   var yCoord = e.nativeEvent.offsetY;
    //   console.log("clientX: " + xCoord);
    //   console.log(" - clientY: " + yCoord);
    // };
    return (
      //we only need the image map, as the question is in QuizCurrent. the image map replaces our answer boxes
      <div className="container mx-auto pt-12 px-2">
        <div
          className="flex justify-center items-center flex-col lg:flex-row lg:justify-around
      "
        >
          {/* inserting image of Ireland to browser */}
          <img
            // used in development only
            //  onClick={printMousePos}
            className="mt-5 mx-auto"
            id="countiesMap"
            src="/images/countiesOfIreland.png"
            width="250"
            height="311"
            alt="Ireland_Provinces"
            // link to image map
            useMap="#counties"
          />
          {/* image map, each area is coordinates of each county, function inserts clicked area's id value into user answer array */}
          <map name="counties">
            <area
              onClick={(e) => this.props.selectAnswer(e.target.id)}
              id="sligo"
              shape="poly"
              coords="111,77,113,96,123,103,111,116,101,107,95,110,81,97,81,88,110,77"
              href="#"
              alt=""
            />
            <area
              onClick={(e) => this.props.selectAnswer(e.target.id)}
              id="mayo"
              shape="poly"
              coords="78,98,71,87,46,87,34,88,26,110,39,122,49,119,56,123,55,127,43,131,43,139,69,146,75,151,87,137,95,129,97,112,73,91"
              href="#"
              alt=""
            />
            <area
              onClick={(e) => this.props.selectAnswer(e.target.id)}
              id="galway"
              shape="poly"
              coords="129,174,114,190,103,186,91,190,82,179,85,169,46,171,25,144,43,141,76,154,87,143,107,136,121,169,130,175"
              href="#"
              alt=""
            />
            <area
              onClick={(e) => this.props.selectAnswer(e.target.id)}
              id="clare"
              shape="poly"
              coords="105,214,87,214,85,207,71,220,39,223,71,184,79,181,87,191,87,191,95,191,101,190,114,193"
              href="#"
              alt=""
            />
            <area
              onClick={(e) => this.props.selectAnswer(e.target.id)}
              id="limerick"
              shape="poly"
              coords="65,225,107,215,121,219,115,229,109,235,119,243,107,245,97,237,69,243,69,227"
              href="#"
              alt=""
            />
            <area
              onClick={(e) => this.props.selectAnswer(e.target.id)}
              id="kerry"
              shape="poly"
              coords="64,227,51,226,49,231,37,237,45,248,16,252,9,260,43,259,13,280,25,289,51,281,24,301,43,290,71,269,67,226"
              href="#"
              alt=""
            />
            <area
              onClick={(e) => this.props.selectAnswer(e.target.id)}
              id="cork"
              shape="poly"
              coords="135,274,65,311,40,309,27,297,39,290,41,292,75,271,69,251,75,245,81,247,93,243,103,248,122,251,121,259,135,274"
              href="#"
              alt=""
            />
            <area
              onClick={(e) => this.props.selectAnswer(e.target.id)}
              id="waterford"
              shape="poly"
              coords="139,274,124,258,144,254,141,247,161,245,169,251,178,251,178,259,139,275"
              href="#"
              alt=""
            />
            <area
              onClick={(e) => this.props.selectAnswer(e.target.id)}
              id="tipperary"
              shape="poly"
              coords="127,180,109,214,119,213,121,219,120,230,113,234,123,241,125,254,141,251,141,245,151,239,158,242,144,209,144,200,139,196,132,202,125,199,131,184,125,180"
              href="#"
              alt=""
            />
            <area
              onClick={(e) => this.props.selectAnswer(e.target.id)}
              id="kilkenny"
              shape="poly"
              coords="178,249,169,249,161,243,154,216,146,213,151,208,168,202,174,205,172,213,180,235,177,249,170,249"
              href="#"
              alt=""
            />
            <area
              onClick={(e) => this.props.selectAnswer(e.target.id)}
              id="wexford"
              shape="poly"
              coords="212,255,186,252,182,245,196,216,203,216,209,210,219,211,210,254"
              href="#"
              alt=""
            />
            <area
              onClick={(e) => this.props.selectAnswer(e.target.id)}
              id="carlow"
              shape="poly"
              coords="200,205,196,204,192,207,196,212,193,219,190,219,184,231,173,212,182,205,192,199,199,200,201,204,196,203"
              href="#"
              alt=""
            />
            <area
              onClick={(e) => this.props.selectAnswer(e.target.id)}
              id="wicklow"
              shape="poly"
              coords="220,177,203,177,192,192,194,197,202,198,205,206,196,208,198,213,208,207,217,207,227,195,222,176"
              href="#"
              alt=""
            />
            <area
              onClick={(e) => this.props.selectAnswer(e.target.id)}
              id="laois"
              shape="poly"
              coords="148,205,145,201,149,195,148,194,152,183,150,179,160,175,162,180,167,179,171,180,174,191,179,199,180,204,174,204,170,198,148,206"
              href="#"
              alt=""
            />
            <area
              onClick={(e) => this.props.selectAnswer(e.target.id)}
              id="kildare"
              shape="poly"
              coords="201,161,180,159,179,160,180,167,176,179,184,199,190,197,185,191,197,182,202,170,200,162"
              href="#"
              alt=""
            />
            <area
              onClick={(e) => this.props.selectAnswer(e.target.id)}
              id="offaly"
              shape="poly"
              coords="169,160,157,168,153,167,149,161,143,163,134,164,130,167,133,173,129,177,134,181,133,197,140,191,142,192,148,177,161,174,165,178,172,175,176,166,170,159"
              href="#"
              alt=""
            />
            <area
              onClick={(e) => this.props.selectAnswer(e.target.id)}
              id="dublin"
              shape="poly"
              coords="221,173,202,171,202,165,209,155,210,152,206,146,214,141,222,147,221,169"
              href="#"
              alt=""
            />
            <area
              onClick={(e) => this.props.selectAnswer(e.target.id)}
              id="meath"
              shape="poly"
              coords="203,157,183,153,174,157,179,136,170,131,182,129,181,123,202,135,212,135,213,137,206,143,205,151,202,158"
              href="#"
              alt=""
            />
            <area
              onClick={(e) => this.props.selectAnswer(e.target.id)}
              id="longford"
              shape="poly"
              coords="133,147,131,141,146,120,148,123,153,127,156,131,148,137,144,148,132,147"
              href="#"
              alt=""
            />
            <area
              onClick={(e) => this.props.selectAnswer(e.target.id)}
              id="westmeath"
              shape="poly"
              coords="136,163,134,150,148,150,162,133,176,141,172,154,155,163,150,157,138,162"
              href="#"
              alt=""
            />
            <area
              onClick={(e) => this.props.selectAnswer(e.target.id)}
              id="roscommon"
              shape="poly"
              coords="123,165,112,131,97,135,101,117,115,117,124,105,126,107,124,116,134,126,128,137,131,161,127,167"
              href="#"
              alt=""
            />
            <area
              onClick={(e) => this.props.selectAnswer(e.target.id)}
              id="leitrim"
              shape="poly"
              coords="148,114,139,125,128,114,130,105,121,101,114,77,121,77,132,86,128,91,128,98,137,105,148,113"
              href="#"
              alt=""
            />
            <area
              onClick={(e) => this.props.selectAnswer(e.target.id)}
              id="louth"
              shape="poly"
              coords="214,131,204,131,203,129,196,119,200,109,208,104,219,111,208,110,207,118,212,122,214,128"
              href="#"
              alt=""
            />
            <area
              onClick={(e) => this.props.selectAnswer(e.target.id)}
              id="cavan"
              shape="poly"
              coords="183,117,174,107,159,103,150,103,135,94,131,97,140,102,150,109,152,117,160,127,162,125,176,127,177,121,183,117,176,106"
              href="#"
              alt=""
            />
            <area
              onClick={(e) => this.props.selectAnswer(e.target.id)}
              id="monaghan"
              shape="poly"
              coords="176,81,170,88,172,93,167,96,167,101,177,102,187,115,191,117,195,111,191,105,190,99,179,83,174,80,170,86,172,92,166,103"
              href="#"
              alt=""
            />
            <area
              onClick={(e) => this.props.selectAnswer(e.target.id)}
              id="fermanagh"
              shape="poly"
              coords="143,66,138,71,131,70,129,74,124,77,134,85,138,87,138,94,145,93,150,100,158,99,162,99,166,93,167,87,158,81,150,81,146,75,148,70,142,67"
              href="#"
              alt=""
            />
            <area
              onClick={(e) => this.props.selectAnswer(e.target.id)}
              id="armagh"
              shape="poly"
              coords="203,77,208,101,195,106,195,97,192,94,190,95,185,88,187,81,190,81,194,73,205,73"
              href="#"
              alt=""
            />
            <area
              onClick={(e) => this.props.selectAnswer(e.target.id)}
              id="down"
              shape="poly"
              coords="205,78,211,101,222,106,227,103,230,93,241,91,250,73,244,56,230,59,232,62,219,71,210,73"
              href="#"
              alt=""
            />
            <area
              onClick={(e) => this.props.selectAnswer(e.target.id)}
              id="tyrone"
              shape="poly"
              coords="158,40,196,63,183,82,176,76,157,86,159,76,153,77,150,75,155,65,138,59,152,55,158,42"
              href="#"
              alt=""
            />
            <area
              onClick={(e) => this.props.selectAnswer(e.target.id)}
              id="donegal"
              shape="poly"
              coords="178,15,167,21,155,39,148,49,137,51,133,55,138,65,123,72,122,61,94,59,99,51,113,51,106,46,113,19,159,2,179,13"
              href="#"
              alt=""
            />
            <area
              onClick={(e) => this.props.selectAnswer(e.target.id)}
              id="derry"
              shape="poly"
              coords="191,15,176,18,172,27,166,29,159,39,171,49,178,45,180,51,178,51,193,61,198,59,200,51,191,17"
              href="#"
              alt=""
            />
            <area
              onClick={(e) => this.props.selectAnswer(e.target.id)}
              id="antrim"
              shape="poly"
              coords="194,17,216,13,238,49,227,56,230,61,217,71,208,69,210,54,202,52,195,18"
              href="#"
              alt=""
            />
          </map>
        </div>
      </div>
    );
  }
}
