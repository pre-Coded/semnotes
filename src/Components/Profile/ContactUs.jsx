import React from 'react'
import {FaInstagram, FaWhatsapp, FaGithub} from 'react-icons/fa'

const ContactUs = () => {
  return (
    <div className='flex justify-around space-x-4 items-center text-3xl'>
        <a href='https://www.instagram.com/acquaintance17/'><FaInstagram/></a>
        <a href="https://wa.me/+918320871229"><FaWhatsapp/></a>
        <a href="https://github.com/pre-Coded"><FaGithub/></a>
    </div>
  )
}

export default ContactUs