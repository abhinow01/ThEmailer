import React from 'react';

const EmailList = ({ emails, onEmailClick, selectedEmailId, currentPage, totalPages, onPageChange }) => {
  return (
    <div className="w-full overflow-y-auto border-r px-4 flex flex-col">
      <div className="flex-grow">
        {emails.map(email => (
          <div 
            key={email.id} 
            className={`p-4 border-b cursor-pointer ${
              email.read ? 'bg-gray-100' : 'bg-white'
            } ${selectedEmailId === email.id ? 'bg-blue-100' : ''}`}
            onClick={() => onEmailClick(email)}
          >
            <div className="flex items-center border border-b rounded-md p-2 m-2 ">
              <div className="w-10 h-10 rounded-full bg-custom-pink flex items-center justify-center mr-4">
                {email.from.name[0].toUpperCase()}
              </div>
              <div>
                <h3 className="font-bold">{email.from.name}</h3>
                <p className="text-sm text-gray-600">{email.subject}</p>
                <p className='text-sm '>{email.short_description}</p>
                <p className="text-xs text-gray-500">{new Date(email.date).toLocaleString()}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center p-4 border-t">
        <button 
          className="bg-custom-pink text-white px-4 py-2 rounded disabled:bg-gray-300"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button 
          className="bg-custom-pink text-white px-4 py-2 rounded disabled:bg-gray-300"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default EmailList;