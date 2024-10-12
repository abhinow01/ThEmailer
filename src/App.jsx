// App.jsx
import React, { useState, useEffect } from 'react';
import EmailList from './EmailList';
import EmailBody from './EmailBody';
import FilterButtons from './FilterButtons';

const App = () => {
  const [emails, setEmails] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [filter, setFilter] = useState('unread');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchEmails(currentPage);
  }, [currentPage]);

  const fetchEmails = async (page) => {
    try {
      const response = await fetch(`https://flipkart-email-mock.vercel.app/?page=${page}`);
      const data = await response.json();
      const initializedEmails = data.list.map(email => ({
        ...email,
        read: false,
        favorite: false
      }));
      setEmails(prevEmails => {
        const newEmails = [...prevEmails, ...initializedEmails];
        // Remove duplicates based on email id
        return Array.from(new Map(newEmails.map(email => [email.id, email])).values());
      });
      setTotalPages(2); // Assuming there are always 2 pages as per the API
    } catch (error) {
      console.error('Error fetching emails:', error);
    }
  };

  const handleEmailClick = async (email) => {
    try {
      const response = await fetch(`https://flipkart-email-mock.now.sh/?id=${email.id}`);
      const data = await response.json();
      const updatedEmail = { ...email, body: data.body, read: true };
      setSelectedEmail(updatedEmail);
      setEmails(prevEmails =>
        prevEmails.map(e => e.id === email.id ? updatedEmail : e)
      );
    } catch (error) {
      console.error('Error fetching email body:', error);
    }
  };

  const handleMarkFavorite = (emailId) => {
    setEmails(prevEmails =>
      prevEmails.map(email =>
        email.id === emailId ? { ...email, favorite: !email.favorite } : email
      )
    );
    if (selectedEmail && selectedEmail.id === emailId) {
      setSelectedEmail(prevSelected => ({
        ...prevSelected,
        favorite: !prevSelected.favorite
      }));
    }
  };

  const filteredEmails = emails.filter(email => {
    if (filter === 'read') return email.read;
    if (filter === 'unread') return !email.read;
    if (filter === 'favorites') return email.favorite;
    return true;
  });

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-gradient-to-r from-pink-600 to-pink-300 text-white p-4">
        <h1 className="text-2xl font-bold">ThEmailer</h1>
      </header>
      <FilterButtons setFilter={setFilter} activeFilter={filter} />
      <div className="flex flex-1 overflow-hidden">
        <EmailList 
          emails={filteredEmails}
          onEmailClick={handleEmailClick}
          selectedEmailId={selectedEmail?.id}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
        {selectedEmail && (
          <EmailBody 
            email={selectedEmail} 
            onMarkFavorite={() => handleMarkFavorite(selectedEmail.id)}
          />
        )}
      </div>
    </div>
  );
};

export default App;