import React from 'react';

const EmailBody = ({ email, onMarkFavorite }) => {
  return (
    <div className="w-full p-4 overflow-y-auto border-b rouned-lg bg-white ">
    <div className='flex flex-row justify-between'>
    <div className='flex flex-row'>
    <div className="w-10 h-10 rounded-full bg-custom-pink flex items-center justify-center mr-4">
                {email.from.name[0].toUpperCase()}
              </div>
    <h2 className="text-2xl font-bold mb-4">{email.subject}</h2>
    </div>
      <div className="mb-4">
        <button 
          className="bg-custom-pink text-white px-4 py-2 rounded-full "
          onClick={onMarkFavorite}
        >
          {email.favorite ? 'Remove from Favorites' : 'Mark as Favorite'}
        </button>
      </div>
      </div>
      <div dangerouslySetInnerHTML={{ __html: email.body }} />
      <p className="mt-4 text-sm text-gray-500">
        {new Date(email.date).toLocaleString()}
      </p>
    </div>
  );
};
export default EmailBody