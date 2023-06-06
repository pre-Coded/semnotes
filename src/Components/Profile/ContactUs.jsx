import React from 'react'
import {FaInstagram, FaWhatsapp, FaGithub} from 'react-icons/fa'

const ContactUs = () => {
  return (
    <div className='flex justify-around items-center text-3xl'>
        <FaInstagram/>
        <FaWhatsapp/>
        <FaGithub/>
    </div>
  )
}

export default ContactUs