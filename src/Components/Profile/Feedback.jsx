import React, { useState } from 'react';
import { useFireBase } from '../../utilities/Firebase';
import emailjs from 'emailjs-com';

const Feedback = () => {
  const firebase = useFireBase();
  const [desc, setDesc] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!desc.trim()) {
      // Input validation: Display an error message or disable the send button
      return;
    }

    setLoading(true);

    try {
      await emailjs.sendForm(
        'service_5eqxak3',
        'template_tt7stla',
        e.target,
        'cj99q1sTO9LqfTBcO'
      );
      console.log('Email sent successfully');
      // Reset the form or show success message to the user
    } catch (error) {
      console.error('Email sending failed:', error);
      // Display error message to the user
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col p-2 space-y-3'>

      <div className='flex items-center space-x-2'>
        <span className='py-2 px-3 bg-[#222222] main-text rounded-md shadow-md text-xs'>
          Email:
        </span>
        <span name="user_name" className='text-sm'>
          {firebase.user.email ? firebase.user.email : 'Not set'}
        </span>
      </div>

      <textarea
        name = 'message'
        cols='30'
        rows='10'
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        className='bg-[#333333] p-2 rounded-md resize-none para-text outline-none main-text'
        placeholder='Type here...'
      ></textarea>

      <input type="submit" value={loading ? 'Sending...' : 'Send'}
        className='py-3 px-6 bg-[#222222] main-text tracking-wider rounded-md shadow-md'
        disabled={loading}
        />

    </form>
  );
};

export default Feedback;
