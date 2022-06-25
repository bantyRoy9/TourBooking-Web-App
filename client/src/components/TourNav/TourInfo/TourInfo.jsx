import React from 'react'
import './tourInfo.css'

const TourInfo = ({tour}) => {
    // console.log(tour);
    // let img1,img2,img3;
    // img1 = tour.images[0];
    // img2 = tour.images[1];
    // img3 = tour.images[2];
    // console.log(img1,img2,img3);
    return (
        <>
            <div className='tourInfo-descr'>
                {tour.description}
            </div>
            <div className="tourInfo-table">
                <h1>Whats Include</h1>
                <div className="tourInfo1">
                    <strong>Desination</strong>
                    <span>London</span>
                </div>
                <hr />
                <div className="tourInfo1">
                    <strong>return Location</strong>
                    <span>London waterloon station</span>
                </div>
                <hr />
                <div className="tourInfo1">
                    <strong>price include</strong>
                    <div>
                    <span>London</span>
                    <span>London</span>
                    <span>London</span>
                    <span>London</span>
                    <span>London</span>
                    </div>
                </div>
                <hr />
                <div className="tourInfo1">
                    <strong>price not include</strong>
                    <div>

                    <span>London</span>
                    <span>London</span>
                    <span>London</span>
                    </div>
                </div>
                <hr />
                <div className="tourInfo1">
                    <strong>additional prices</strong>
                    <div>

                    <span>London</span>
                    <span>London</span>
                    <span>London</span>
                    </div>
                </div>
                <hr />
            </div>
            <div className="tourIfo-culture">
                <div className="tourInfo-culture1">
                    {/* <img src={`/img/tours/${img1}`} alt="" /> */}
                    <h1>Art and Culture</h1>
                    <p>Lorem ipsum, Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores nemo quisquam, debitis mollitia dicta saepe fuga minus eum numquam dolores dolor laboriosam asperiores veniam esse commodi a eaque cumque facilis! dolor sit amet consectetur adipisicing elit. Saepe in unde vel asperiores doloremque temporibus cupiditate voluptatibus consectetur facilis quidem. Qui illum quis exercitationem odio eum, porro ut deleniti commodi?</p>
                </div>
                <div className="tourInfo-culture1">
                    <img src="/img/tours/tour-1-2.jpg" alt="" />
                    <h1>Art and Culture</h1>
                    <p>Lorem ipsum, Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores nemo quisquam, debitis mollitia dicta saepe fuga minus eum numquam dolores dolor laboriosam asperiores veniam esse commodi a eaque cumque facilis! dolor sit amet consectetur adipisicing elit. Saepe in unde vel asperiores doloremque temporibus cupiditate voluptatibus consectetur facilis quidem. Qui illum quis exercitationem odio eum, porro ut deleniti commodi?</p>
                </div>
                <div className="tourInfo-culture1">
                    <img src="/img/tours/tour-1-3.jpg" alt="" />
                    <h1>Art and Culture</h1>
                    <p>Lorem ipsum, Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores nemo quisquam, debitis mollitia dicta saepe fuga minus eum numquam dolores dolor laboriosam asperiores veniam esse commodi a eaque cumque facilis! dolor sit amet consectetur adipisicing elit. Saepe in unde vel asperiores doloremque temporibus cupiditate voluptatibus consectetur facilis quidem. Qui illum quis exercitationem odio eum, porro ut deleniti commodi?</p>
                </div>
            </div>


        </>
    )
}

export default TourInfo