import React, { useState } from 'react';
import 'rsuite/dist/rsuite.min.css';
import { CustomProvider, Header, Navbar, Nav, Toggle, Divider } from 'rsuite';
import { CiBellOn,CiBookmarkCheck,CiLogout  } from "react-icons/ci";
import { MdHistory,MdDarkMode,MdLightMode  } from "react-icons/md";
import { CgProfile } from "react-icons/cg";



function NavbarComponent() {
    const [theme, setTheme] = useState('light');

    const handleThemeChange = (checked) => {
        setTheme(checked ? 'dark' : 'light');
    };

    return (
        <CustomProvider theme={theme}>
            <div className="show-fake-browser navbar-page" style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ width: '90%' }}>
                    <Header>
                        <Navbar appearance="default" style={{ borderRadius: '40px', marginTop:'5px' }}>
                            <Navbar.Brand>NetQuest</Navbar.Brand>
                            <Nav pullRight>
                            
                                <Nav.Menu title="Ram Bahadur">
                                    <Nav.Item><CgProfile />Profile Settings</Nav.Item>
                                    <Nav.Item> <CiBellOn /> Notifications</Nav.Item>
                                    <Nav.Item> <CiBookmarkCheck />Bookmarks</Nav.Item>
                                    <Nav.Item><MdHistory /> History</Nav.Item>
                                    <Nav.Item><Toggle
                                        size="sm"
                                        checked={theme === 'dark'}
                                        onChange={handleThemeChange}
                                        checkedChildren={<MdDarkMode />}
                                        unCheckedChildren={<MdLightMode />}
                                        // style={{ paddingTop: '10px', marginRight: '10px',marginLeft: '10px' }}
                                    />Theme</Nav.Item>
                                    <Divider />
                                    <Nav.Item><CiLogout/> Logout</Nav.Item>
                                    



                                </Nav.Menu>                              
                                
                            </Nav>
                        </Navbar>
                    </Header>
                </div>
            </div>
        </CustomProvider>
    );
}

export default NavbarComponent;


