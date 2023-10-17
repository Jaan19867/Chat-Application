

import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import loader from '../assets/loader.gif';
import {useState , useEffect} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { setAvatarRoute } from '../utils/APIRoutes';
import React from 'react'

const SetAvatar = () => {
  return (
    <div>
      Avatar ko set karlo
    </div>
  )
}

export default SetAvatar
