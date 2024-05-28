import { Panel, Rate, Text, Button, Badge} from 'rsuite';
import { FaLocationDot } from "react-icons/fa6";


const ContentCard = () => (
    <div>
        <Panel header="Hot Picks 🔥" shaded>
        <div style={{ display: 'flex', overflowX: 'auto' }}>
            <div style={{ display: 'inline-block', marginRight: '15px' }}>
                <Panel shaded bordered bodyFill style={{ width: '380px' }}>
                    <img src="https://www.allsportamerica.com/wp-content/uploads/Futsal3.jpg"  alt='Futsal1' height="380" />
                    <Panel> 
                        <Text weight="semibold" size={'xl'}>
                            Futsal 1 <Rate defaultValue={4} disabled color="yellow" allowHalf size='xs'/>
                        </Text>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={{ display: 'inline-block', marginRight: '5px' }}><FaLocationDot /></div>
                            <div> <Text weight="medium">Balumari, Lalitpur</Text></div>    
                        </div >  
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={{ display: 'inline-block', marginRight: '5px' }}>
                                <Text weight="regular">Starting From</Text>
                            </div>
                            <div>
                                <Text weight="medium" color='red'>Rs.1200</Text>
                            </div>
                            </div>    
                            <div>
                            <Button color="blue" appearance="primary">
                                Book Now
                            </Button>
                            </div>
                        </div>
                    </Panel>
                </Panel>
            </div>
            
            <div style={{ display: 'inline-block', marginRight: '15px' }}>
                <Panel shaded bordered bodyFill style={{ width: '380px' }}>
                    <img src="https://cdn-west.sqhk.co/ekrsportcourttemplate/2016/1/fBdnRpb/JapanHandball100100(1).jpg"  alt='Futsal1' height="380" />
                    <Panel> 
                        <Text weight="semibold" size={'xl'}>
                            Futsal 2 <Rate defaultValue={2} disabled color="yellow" allowHalf size='xs'/>
                        </Text>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={{ display: 'inline-block', marginRight: '5px' }}><FaLocationDot /></div>
                            <div> <Text weight="medium">Sankhamul, Lalitpur</Text></div>    
                        </div >  
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={{ display: 'inline-block', marginRight: '5px' }}>
                                <Text weight="regular">Starting From</Text>
                            </div>
                            <div>
                                <Text weight="medium" color='red'>Rs.1250</Text>
                            </div>
                            </div>    
                            <div>
                            <Button color="blue" appearance="primary">
                                Book Now
                            </Button>
                            </div>
                        </div>
                    </Panel>
                </Panel>
            </div>

            <div style={{ display: 'inline-block', marginRight: '15px' }}>
                <Panel shaded bordered bodyFill style={{ width: '380px' }}>
                    <img src="https://www.allsportamerica.com/wp-content/uploads/Futsal1.jpg"  alt='Futsal1' height="380" />
                    <Panel> 
                        <Text weight="semibold" size={'xl'}>
                            Futsal 3 <Rate defaultValue={4.5} disabled color="yellow" allowHalf size='xs'/>
                        </Text>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={{ display: 'inline-block', marginRight: '5px' }}><FaLocationDot /></div>
                            <div> <Text weight="medium">Baneshwor, Kathmandu</Text></div>    
                        </div >  
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={{ display: 'inline-block', marginRight: '5px' }}>
                                <Text weight="regular">Starting From</Text>
                            </div>
                            <div>
                                <Text weight="medium" color='red'>Rs.1400</Text>
                            </div>
                            </div>    
                            <div>
                            <Button color="blue" appearance="primary">
                                Book Now
                            </Button>
                            </div>
                        </div>
                    </Panel>
                </Panel>
            </div>

            <div style={{ display: 'inline-block', marginRight: '15px' }}>
                <Panel shaded bordered bodyFill style={{ width: '380px' }}>
                    <img src="https://cdn.sqhk.co/2020newsportcourt/2020/2/LyFsgdr/SportCourtFutsal4.jpg"  alt='Futsal1' height="380" />
                    <Panel> 
                        <Text weight="semibold" size={'xl'}>
                            Futsal 4 <Rate defaultValue={3} disabled color="yellow" allowHalf size='xs'/>
                        </Text>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={{ display: 'inline-block', marginRight: '5px' }}><FaLocationDot /></div>
                            <div> <Text weight="medium">Boje Pokhari, Lalitpur</Text></div>    
                        </div >  
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={{ display: 'inline-block', marginRight: '5px' }}>
                                <Text weight="regular">Starting From</Text>
                            </div>
                            <div>
                                <Text weight="medium" color='red'>Rs.1300</Text>
                            </div>
                            </div>    
                            <div>
                            <Button color="blue" appearance="primary">
                                Book Now
                            </Button>
                            </div>
                        </div>
                    </Panel>
                </Panel>
            </div>
            <div style={{ display: 'inline-block', marginRight: '15px' }}>
                <Panel shaded bordered bodyFill style={{ width: '380px' }}>
                    <img src="https://www.allsportamerica.com/wp-content/uploads/Futsal3.jpg"  alt='Futsal1' height="380" />
                    <Panel> 
                        <Text weight="semibold" size={'xl'}>
                            Futsal 5 <Rate defaultValue={3} disabled color="yellow" allowHalf size='xs'/>
                        </Text>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={{ display: 'inline-block', marginRight: '5px' }}><FaLocationDot /></div>
                            <div> <Text weight="medium">Lagankhel, Lalitpur</Text></div>    
                        </div >  
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={{ display: 'inline-block', marginRight: '5px' }}>
                                <Text weight="regular">Starting From</Text>
                            </div>
                            <div>
                                <Text weight="medium" color='red'>Rs.1350</Text>
                            </div>
                            </div>    
                            <div>
                            <Button color="blue" appearance="primary">
                                Book Now
                            </Button>
                            </div>
                        </div>
                    </Panel>
                </Panel>
            </div>
            <div style={{ display: 'inline-block', marginRight: '15px' }}>
                <Panel shaded bordered bodyFill style={{ width: '380px' }}>
                    <img src="https://cdn-west.sqhk.co/ekrsportcourttemplate/2016/1/fBdnRpb/JapanHandball100100(1).jpg"  alt='Futsal1' height="380" />
                    <Panel> 
                        <Text weight="semibold" size={'xl'}>
                            Futsal 6 <Rate defaultValue={3} disabled color="yellow" allowHalf size='xs'/>
                        </Text>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={{ display: 'inline-block', marginRight: '5px' }}><FaLocationDot /></div>
                            <div> <Text weight="medium">Kalanki, Kathmandu</Text></div>    
                        </div >  
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={{ display: 'inline-block', marginRight: '5px' }}>
                                <Text weight="regular">Starting From</Text>
                            </div>
                            <div>
                                <Text weight="medium" color='red'>Rs.1400</Text>
                            </div>
                            </div>    
                            <div>
                            <Button color="blue" appearance="primary">
                                Book Now
                            </Button>
                            </div>
                        </div>
                    </Panel>
                </Panel>
            </div>
        </div>
    </Panel>   <Panel header="Top Rated ⭐" shaded>
        <div style={{ display: 'flex', overflowX: 'auto' }}>
            

           
            <div style={{ display: 'inline-block', marginRight: '15px' }}>
            <Badge content="HOT">
                <Panel shaded bordered bodyFill style={{ width: '380px' }}>
                    <img src="https://www.allsportamerica.com/wp-content/uploads/Futsal3.jpg"  alt='Futsal1' height="380" />
                    <Panel> 
                        <Text weight="semibold" size={'xl'}>
                            Futsal 1 <Rate defaultValue={4} disabled color="yellow" allowHalf size='xs'/>
                        </Text>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={{ display: 'inline-block', marginRight: '5px' }}><FaLocationDot /></div>
                            <div> <Text weight="medium">Balumari, Lalitpur</Text></div>    
                        </div >  
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={{ display: 'inline-block', marginRight: '5px' }}>
                                <Text weight="regular">Starting From</Text>
                            </div>
                            <div>
                                <Text weight="medium" color='red'>Rs.1200</Text>
                            </div>
                            </div>    
                            <div>
                            <Button color="blue" appearance="primary">
                                Book Now
                            </Button>
                            </div>
                        </div>
                    </Panel>
                </Panel>
                </Badge>
            </div>
            
            <div style={{ display: 'inline-block', marginRight: '15px' }}>
                <Panel shaded bordered bodyFill style={{ width: '380px' }}>
                    <img src="https://cdn-west.sqhk.co/ekrsportcourttemplate/2016/1/fBdnRpb/JapanHandball100100(1).jpg"  alt='Futsal1' height="380" />
                    <Panel> 
                        <Text weight="semibold" size={'xl'}>
                            Futsal 2 <Rate defaultValue={2} disabled color="yellow" allowHalf size='xs'/>
                        </Text>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={{ display: 'inline-block', marginRight: '5px' }}><FaLocationDot /></div>
                            <div> <Text weight="medium">Sankhamul, Lalitpur</Text></div>    
                        </div >  
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={{ display: 'inline-block', marginRight: '5px' }}>
                                <Text weight="regular">Starting From</Text>
                            </div>
                            <div>
                                <Text weight="medium" color='red'>Rs.1250</Text>
                            </div>
                            </div>    
                            <div>
                            <Button color="blue" appearance="primary">
                                Book Now
                            </Button>
                            </div>
                        </div>
                    </Panel>
                </Panel>
            </div>

            <div style={{ display: 'inline-block', marginRight: '15px' }}>
                <Panel shaded bordered bodyFill style={{ width: '380px' }}>
                    <img src="https://www.allsportamerica.com/wp-content/uploads/Futsal1.jpg"  alt='Futsal1' height="380" />
                    <Panel> 
                        <Text weight="semibold" size={'xl'}>
                            Futsal 3 <Rate defaultValue={4.5} disabled color="yellow" allowHalf size='xs'/>
                        </Text>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={{ display: 'inline-block', marginRight: '5px' }}><FaLocationDot /></div>
                            <div> <Text weight="medium">Baneshwor, Kathmandu</Text></div>    
                        </div >  
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={{ display: 'inline-block', marginRight: '5px' }}>
                                <Text weight="regular">Starting From</Text>
                            </div>
                            <div>
                                <Text weight="medium" color='red'>Rs.1400</Text>
                            </div>
                            </div>    
                            <div>
                            <Button color="blue" appearance="primary">
                                Book Now
                            </Button>
                            </div>
                        </div>
                    </Panel>
                </Panel>
            </div>

            <div style={{ display: 'inline-block', marginRight: '15px' }}>
                <Panel shaded bordered bodyFill style={{ width: '380px' }}>
                    <img src="https://cdn.sqhk.co/2020newsportcourt/2020/2/LyFsgdr/SportCourtFutsal4.jpg"  alt='Futsal1' height="380" />
                    <Panel> 
                        <Text weight="semibold" size={'xl'}>
                            Futsal 4 <Rate defaultValue={3} disabled color="yellow" allowHalf size='xs'/>
                        </Text>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={{ display: 'inline-block', marginRight: '5px' }}><FaLocationDot /></div>
                            <div> <Text weight="medium">Boje Pokhari, Lalitpur</Text></div>    
                        </div >  
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={{ display: 'inline-block', marginRight: '5px' }}>
                                <Text weight="regular">Starting From</Text>
                            </div>
                            <div>
                                <Text weight="medium" color='red'>Rs.1300</Text>
                            </div>
                            </div>    
                            <div>
                            <Button color="blue" appearance="primary">
                                Book Now
                            </Button>
                            </div>
                        </div>
                    </Panel>
                </Panel>
            </div>
            <div style={{ display: 'inline-block', marginRight: '15px' }}>
                <Panel shaded bordered bodyFill style={{ width: '380px' }}>
                    <img src="https://www.allsportamerica.com/wp-content/uploads/Futsal3.jpg"  alt='Futsal1' height="380" />
                    <Panel> 
                        <Text weight="semibold" size={'xl'}>
                            Futsal 5 <Rate defaultValue={3} disabled color="yellow" allowHalf size='xs'/>
                        </Text>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={{ display: 'inline-block', marginRight: '5px' }}><FaLocationDot /></div>
                            <div> <Text weight="medium">Lagankhel, Lalitpur</Text></div>    
                        </div >  
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={{ display: 'inline-block', marginRight: '5px' }}>
                                <Text weight="regular">Starting From</Text>
                            </div>
                            <div>
                                <Text weight="medium" color='red'>Rs.1350</Text>
                            </div>
                            </div>    
                            <div>
                            <Button color="blue" appearance="primary">
                                Book Now
                            </Button>
                            </div>
                        </div>
                    </Panel>
                </Panel>
            </div>
            <div style={{ display: 'inline-block', marginRight: '15px' }}>
                <Panel shaded bordered bodyFill style={{ width: '380px' }}>
                    <img src="https://cdn-west.sqhk.co/ekrsportcourttemplate/2016/1/fBdnRpb/JapanHandball100100(1).jpg"  alt='Futsal1' height="380" />
                    <Panel> 
                        <Text weight="semibold" size={'xl'}>
                            Futsal 6 <Rate defaultValue={3} disabled color="yellow" allowHalf size='xs'/>
                        </Text>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={{ display: 'inline-block', marginRight: '5px' }}><FaLocationDot /></div>
                            <div> <Text weight="medium">Kalanki, Kathmandu</Text></div>    
                        </div >  
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={{ display: 'inline-block', marginRight: '5px' }}>
                                <Text weight="regular">Starting From</Text>
                            </div>
                            <div>
                                <Text weight="medium" color='red'>Rs.1400</Text>
                            </div>
                            </div>    
                            <div>
                            <Button color="blue" appearance="primary">
                                Book Now
                            </Button>
                            </div>
                        </div>
                    </Panel>
                </Panel>
            </div>
        </div>
    </Panel>


   
    </div>
   
);

export default ContentCard;
