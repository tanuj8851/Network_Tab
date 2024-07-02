import React, { useState, useEffect } from 'react';
import { networkRequests } from './interceptors';
import axios from 'axios';
import {
    Box,
    TextField,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    ButtonGroup
} from '@mui/material';
import RequestDetail from './RequestDetail';

const NetworkTab = () => {
    const [requests, setRequests] = useState([]);
    const [url, setUrl] = useState('');
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [sortType, setSortType] = useState('');


    useEffect(() => {
        const interval = setInterval(() => {
            setRequests([...networkRequests]);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleFetch = () => {
        axios.get(`https://cors-backend-h9oa.onrender.com/proxy?url=${encodeURIComponent(url)}`)
            .then(response => {
                setRequests([...requests, {
                    url,
                    status: response.status,
                    type: response.headers['content-type'].split(";")[0],
                    size: new Blob([JSON.stringify(response.data)]).size,
                    duration: 0,
                }]);
            })
            .catch(error => console.error(error));
    };

    const handleRowClick = (request) => {
        setSelectedRequest(request);
    };

    const handleSort = (type) => {
        setSortType(type);
        const sortedRequests = [...requests].sort((a, b) => {
            const types = type.split(";")[0];
            if (a[types] < b[types]) return -1;
            if (a[types] > b[types]) return 1;
            return 0;
        });
        setRequests(sortedRequests);
    };

    return (
        <Box sx={{ p: 3 }}>
            <h1>Network Tab</h1>
            <Box sx={{ mb: 2, display: 'flex', gap: 2 }}>
                <TextField
                    label="Enter URL"
                    variant="outlined"
                    fullWidth
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                />
                <Button variant="contained" color="primary" onClick={handleFetch}>
                    Fetch
                </Button>
            </Box>
            <ButtonGroup variant="contained" sx={{ mb: 2, gap: 2 }} >
                <Button onClick={() => handleSort('XHR')}>XHR</Button>
                <Button onClick={() => handleSort('HTML')}>HTML</Button>
                <Button onClick={() => handleSort('JS')}>JS</Button>
                <Button onClick={() => handleSort('application/json')}>application/json</Button>
            </ButtonGroup>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Size (bytes)</TableCell>
                            <TableCell>Time (ms)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {requests.map((req, index) => (
                            <TableRow key={index} onClick={() => handleRowClick(req)}>
                                <TableCell>{req.url}</TableCell>
                                <TableCell>{req.status}</TableCell>
                                <TableCell>{req.type ? req.type.split(";")[0] : req.type}</TableCell>
                                <TableCell>{req.size}</TableCell>
                                <TableCell>{req.duration}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {selectedRequest && <RequestDetail request={selectedRequest} />}
        </Box>
    );
};

export default NetworkTab;
