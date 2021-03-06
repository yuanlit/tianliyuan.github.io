import React, { Component } from 'react';
import axios from "axios";
import { TheStyle } from './theaterStyle';
import Swiper from 'swiper'

let dian = require("@/img/dian.png")

class theater extends Component {
    render() {
        return (
            <div>
                <TheStyle>
                    <div className="head_nav">
                        <h3>剧院</h3>
                    </div>

                    <div className="theater-body">
                        <div className="theater-list">
                            <ul>
                                {
                                    this.state.theatreList.map((item, index) => {
                                        return (
                                            <li key={index}>
                                                <div className="theater-info-shows">
                                                    <div className="theater-info">
                                                        <a href="null" className="theater-pic-name-count">
                                                            <img src={item.pic} alt="" />
                                                            <div className="theater-name-count-wrap">
                                                                <span>{item.name}</span>
                                                                <p>{item.count}场在售演出</p>
                                                            </div>
                                                        </a>
                                                        <a href="null" className="theater-link">
                                                            <img alt="图片丢失"  src={dian} />
                                                        </a>
                                                    </div>

                                                    <div className="theater-shows">
                                                        <div className="theater-show-wrap">
                                                            <div className="swiper-container">
                                                                <div className="swiper-wrapper">
                                                                    {
                                                                        item.show_list.map((item2, index) => {
                                                                            return (
                                                                                <div className="swiper-slide" key={index}>
                                                                                    <div className="theater-show-date">
                                                                                        <p>{item2.show_time}</p>
                                                                                        <span></span>
                                                                                    </div>
                                                                                    <a href="null">
                                                                                        <img src={item2.pic} alt="" />
                                                                                    </a>
                                                                                </div>
                                                                            )
                                                                        })
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>

                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </TheStyle>
            </div>
        );
    }
    constructor() {
        super()
        this.state = {
            theatreList: []
        }
    }
    componentDidMount() {
        axios("/apis/RestTheatre/getTheatreList", {
            params: {
                page: 1,
                version: "5.1.4",
                referer: 2
            }
        }).then(res => {
            console.log(res.data.data.theatre_list);

            this.setState({ theatreList: res.data.data.theatre_list })
            var swiper = new Swiper('.swiper-container', {
                slidesPerView: 'auto',
                spaceBetween: 0,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
            });
        })
    }
}

export default theater;