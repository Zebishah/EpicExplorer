
import express, { response } from 'express';
import io from '../index.js';


const notifyUsers = (data) => {
    io.emit('notification', data, (err) => { // Add error handling
        if (err) {
            console.error('Error emitting notification:', err);
        } else {
            console.log('Notification emitted successfully!');
        }
    });
};


export default notifyUsers;