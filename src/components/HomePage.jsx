import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { BookOpen, RotateCcw, Search } from 'lucide-react';

export function HomePage() {
  const { 
    topics, 
    questions, 
    setCurrentPage, 
    getRandomQuestions 
  } = useApp();

  const navigate = useNavigate();
  
  const [searchQuery, setSearchQuery] = useState('');

  const handleDailyRevision = () => {
    setCurrentPage('revision');
    navigate('/revision');
  };

  const getTopicStats = (topicName) => {
    const topicQuestions = questions.filter(q => q.topic === topicName);
    const revised = topicQuestions.filter(q => q.isRevised).length;
    return { total: topicQuestions.length, revised };
  };

  const filteredQuestions = questions.filter(q =>
    q.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pickRandomQuestion = () => {
    getRandomQuestions(1).then(randomQuestions => {
      if (randomQuestions.length > 0) {
        const question = randomQuestions[0];
        // Store the single question and navigate to the revision page to show it
        try {
          localStorage.setItem('selectedRandomQuestion', JSON.stringify(question));
        } catch (e) {
          console.error('Could not store selectedRandomQuestion in localStorage', e);
        }
        setCurrentPage('revision');
        navigate('/revision');
      } else {
        alert('No questions available. Add some questions first!');
      }
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Welcome to CodeBase
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
        Your own codebase to mastering Data Structures and Algorithms with organized revision and progress tracking. 
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <button
          onClick={handleDailyRevision}
          className="bg-blue-600 hover:bg-blue-700 text-white p-6 rounded-lg shadow-md transition-colors group"
        >
          <div className="flex items-center justify-center mb-3">
            <RotateCcw className="w-8 h-8 group-hover:rotate-180 transition-transform duration-300" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Today Revision</h3>
          <p className="text-blue-100">Get 5 random questions to practice</p>
        </button>

        <button
          onClick={() => {
            setCurrentPage('questions');
            navigate('/questions');
          }}
          className="bg-green-600 hover:bg-green-700 text-white p-6 rounded-lg shadow-md transition-colors group"
        >
          <div className="flex items-center justify-center mb-3">
            <BookOpen className="w-8 h-8 group-hover:scale-110 transition-transform" />
          </div>
          <h3 className="text-lg font-semibold mb-2">All Questions</h3>
          <p className="text-green-100">View and manage your question bank</p>
        </button>

        <button
         
          type="button"
          disabled
          className="bg-purple-600 text-white p-6 rounded-lg shadow-md opacity-70 cursor-not-allowed"
        >
           
          <h3 className="text-lg font-semibold mb-2">Coming Soon</h3>
          <p className="text-purple-100">Feature coming soon</p>
        </button>
      </div>

      {/* Search Bar */}
      <div className="max-w-md mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
        </div>
        
        {searchQuery && (
          <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">
              Search Results ({filteredQuestions.length})
            </h4>
            {filteredQuestions.length > 0 ? (
              <div className="space-y-2">
                {filteredQuestions.slice(0, 5).map(question => (
                  <div key={question._id} className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-gray-900 dark:text-white">{question.name}</span>
                        {question.link && (
                          <a
                            href={question.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                            title="Open problem link"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        )}
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">({question.topic})</span>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      question.difficulty === 'Easy' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                        : question.difficulty === 'Medium'
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                    }`}>
                      {question.difficulty}
                    </span>
                  </div>
                ))}
                {filteredQuestions.length > 5 && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 text-center pt-2">
                    and {filteredQuestions.length - 5} more...
                  </p>
                )}
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400">No questions found</p>
            )}
          </div>
        )}
      </div>

      {/* Topics Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Topics</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {topics.map(topic => {
            const stats = getTopicStats(topic.name);
            const progress = stats.total > 0 ? (stats.revised / stats.total) * 100 : 0;
            
            return (
              <button
                key={topic._id}
                onClick={() => {
                  setCurrentPage('questions');
                  // Navigate with topic query param so QuestionsPage can read it
                  navigate(`/questions?topic=${encodeURIComponent(topic.name)}`);
                }}
                className="w-full p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow group text-left"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {topic.name}
                  </h3>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-300">Questions:</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {stats.revised}/{stats.total}
                    </span>
                  </div>
                  
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  
                  <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
                    {Math.round(progress)}% completed
                  </div>
                </div>
              </button>
            );
          })}
        </div>

{topics.length === 0 && (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No topics yet. Topics will appear automatically when you add questions!</p>
          </div>
        )}
      </div>
    </div>
  );
}