
import React from 'react';
import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,

} from '@mui/material';

const RequestDetail = ({ request }) => {



    return (
        <Box sx={{ mt: 2 }} bgcolor={"black"} color={"white"}>
            <Typography variant="h6">Request Details</Typography>
            <TableContainer component={Paper} sx={{ mt: 2 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Category</TableCell>
                            <TableCell>Details</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>General</TableCell>
                            <TableCell>
                                <div>Request URL: {request.url}</div>
                                <div>Method: {request.method}</div>
                                <div>Status Code: {request.status}</div>
                                <div>Remote Address: {request.responseHeaders['remote-address'] ? request.responseHeaders['remote-address'] : ""}</div>
                                <div>Referrer Policy: {request.responseHeaders['referrer-policy'] ? request.responseHeaders['referrer-policy'] : ""}</div>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Headers</TableCell>
                            <TableCell>
                                <div>Request Headers: {JSON.stringify(request.headers)}</div>
                                <div>Response Headers: {JSON.stringify(request.responseHeaders)}</div>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Response</TableCell>
                            <TableCell>{JSON.stringify(request.response)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Initiator</TableCell>
                            <TableCell>{request.initiator}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Timing</TableCell>
                            <TableCell>{request.duration} ms</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default RequestDetail;
