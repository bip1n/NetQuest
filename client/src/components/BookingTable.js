import React from 'react';
import { Table, Panel, Button, Checkbox, Text } from 'rsuite';

const { Column, HeaderCell, Cell } = Table;

const data = [
  { id: 1, col1: '7:00 am- 8:00 am', col2: <Button color='red' appearance='primary' readOnly size='xs' > Booked </Button>, col3: <Text size="md">Rs. 1200</Text>, col4: <Checkbox disabled/> },
  { id: 2, col1: '8:00 am- 9:00 am', col2: <Button color='yellow' appearance='primary' readOnly size='xs'> Reserved </Button>, col3: <Text size="md">Rs. 800</Text>,col4: <Checkbox disabled/> },
  { id: 3, col1: '9:00 am- 10:00 am', col2: <Button color='greem' appearance='primary' size='xs'> Available </Button>,col3: <Text size="md">Rs. 1250</Text>, col4: <Checkbox /> },
  { id: 4, col1: '10:00 am- 11:00 am', col2: <Button color='greem' appearance='primary' size='xs'> Available </Button>,col3: <Text size="md">Rs. 1200</Text>, col4: <Checkbox /> },
  { id: 5, col1: '11:00 am- 12:00 pm', col2:  <Button color='red' appearance='primary' size='xs' readOnly > Booked </Button>,col3: <Text size="md">Rs. 1400</Text>, col4: <Checkbox  disabled/> },
  { id: 6, col1: '7:00 am- 8:00 am', col2: <Button color='greem' appearance='primary' size='xs'> Available </Button>,col3: <Text size="md">Rs. 1600</Text>, col4: <Checkbox /> },

];


const BookingTable = () => {
  return (
    <div>
        <Panel header="Date: 2 May">
        <Table height={400} data={data}>
            <Column width={135} align="left" fixed>
            <HeaderCell><Text weight="bold">Shift</Text></HeaderCell>
            <Cell dataKey="col1" />
            </Column>

            <Column width={75} align="center">
            <HeaderCell><Text weight="bold">Status</Text></HeaderCell>
            <Cell dataKey="col2"  />
            </Column>

            <Column width={70} align="center">
            <HeaderCell><Text weight="bold">Rate</Text></HeaderCell>
            <Cell dataKey="col3"  />
            </Column>

            <Column width={60} align="right">
            <HeaderCell><Text weight="bold">Select</Text></HeaderCell>
            <Cell dataKey="col4" />
            </Column>
            
        </Table>
        </Panel>
        
    </div>

  );
};

export default BookingTable