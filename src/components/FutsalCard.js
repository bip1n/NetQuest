import React, { useRef, useState } from 'react';
import { Panel, Carousel,Text, Rate, Button } from 'rsuite';
import { FaLocationDot } from "react-icons/fa6";
import 'rsuite/dist/rsuite.min.css';

const FutsalCard = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const startXRef = useRef(0);
    const items = [
        "https://www.allsportamerica.com/wp-content/uploads/Futsal3.jpg",
        "https://cdn-west.sqhk.co/ekrsportcourttemplate/2016/1/fBdnRpb/JapanHandball100100(1).jpg",
        "https://www.allsportamerica.com/wp-content/uploads/Futsal3.jpg",
        "https://cdn-west.sqhk.co/ekrsportcourttemplate/2016/1/fBdnRpb/JapanHandball100100(1).jpg",
        "https://www.allsportamerica.com/wp-content/uploads/Futsal3.jpg"
    ];
    const handleTouchStart = (e) => {
        startXRef.current = e.touches[0].clientX;
    };
    const handleTouchMove = (e) => {
        if (startXRef.current === 0) return;
        const currentX = e.touches[0].clientX;
        const deltaX = currentX - startXRef.current;

        if (Math.abs(deltaX) > 50) {
            if (deltaX > 0 && activeIndex > 0) {
                setActiveIndex((prevIndex) => prevIndex - 1);
            } else if (deltaX < 0 && activeIndex < items.length - 1) {
                setActiveIndex((prevIndex) => prevIndex + 1);
            }
            startXRef.current = 0;
        }
    };
    return (
        <div>
            <Panel header="Futsal 1" shaded>
                <div>
                    <div>
                        <Panel shaded bordered bodyFill style={{ display: 'inline-block', width: 380 }}>
                            <Carousel
                                activeIndex={activeIndex}
                                onSelect={setActiveIndex}
                                autoplay
                                autoplayInterval={4000}
                                placement="bottom"
                                shape="bar"
                                className="custom-slider"
                                onTouchStart={handleTouchStart}
                                onTouchMove={handleTouchMove}
                            >
                                {items.map((src, index) => (
                                    <img key={index} src={src} height="250" />
                                ))}
                            </Carousel>
                        </Panel>
                    </div>
                    <div>
                    <Panel> 
                            <Text weight="semibold" size={'xl'}>
                                Futsal 2 <Rate defaultValue={2} disabled color="yellow" allowHalf size='xs'/>
                            </Text>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <div style={{ display: 'inline-block', marginRight: '5px' }}><FaLocationDot /></div>
                                <div> <Text weight="medium">Sankhamul, Lalitpur</Text></div>    
                            </div >  
                            <div >
                                <Text weight="regular">Amenities: </Text>
                                <Text weight="medium" >___i. 2 Bottle Water</Text>
                                <Text weight="medium" >___ii. Locker</Text>
                                <Text weight="medium" >___iii. Shower</Text>

                            </div>
                        </Panel>
                    </div>
                </div>
            </Panel> 
            <Panel>
                Bookings
            </Panel>
        </div>
    );
};

export default FutsalCard;
