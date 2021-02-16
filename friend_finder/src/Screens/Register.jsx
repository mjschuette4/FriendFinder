import React, {useState} from 'react';
import {ToastContainer,  toast} from 'react-toastify';
import {authenticate, isAuth } from '../helpers/auth';
import axios from 'axios';
import {Redirect} from 'react-router-dom';