import { Input, InputGroup, Grid, Row, Col } from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';
import React from 'react';

const styles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '12vh', // Adjust as needed to center vertically within the viewport
};

const CustomInputGroupWidthButton = ({ placeholder, ...props }) => (
  <InputGroup {...props} inside style={{ marginBottom: 10 }}>
    <Input placeholder={placeholder} />
    <InputGroup.Button>
      <SearchIcon />
    </InputGroup.Button>
  </InputGroup>
);

const Searchbar = () => (
  <Grid fluid style={styles}>
    <Row style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <Col xs={18} sm={12} md={28}>
        <CustomInputGroupWidthButton size="md" placeholder="Search Futsal or Location" />
      </Col>
    </Row>
  </Grid>
);

export default Searchbar;
