// ====================================================================
// FILE: components/MainApp.js
// ====================================================================

import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import HomeScreen from './home/HomeScreen';
import FindBuddyScreen from './study/FindBuddyScreen';
import CreateRequestScreen from './study/CreateRequestScreen';
import CalendarScreen from './calendar/CalendarScreen';
import ProfileScreen from './profile/ProfileScreen';
import ClassDetailScreen from './classes/ClassDetailScreen';
import ChatScreen from './chat/ChatScreen';
import NavBar from './common/NavBar';
import AddClassModal from './home/AddClassModal';

export default function MainApp({ onLogout }) {
  const [activeScreen, setActiveScreen] = useState('home');
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedMatch, setSelectedMatch] = useState(null);
  
  const [currentUser] = useState({
    id: 'user1',
    name: 'Alex Johnson',
    pronouns: 'they/them',
    email: 'alex.j@university.edu'
  });

  const [userClasses, setUserClasses] = useState([
    { id: 'class1', name: 'Logic Design and Computer Organization', code: 'CSDS281', section: '002' },
    { id: 'class2', name: 'Academic Inquiry Seminar', code: 'AIQS100', section: '001' },
    { id: 'class3', name: 'Data Structures', code: 'CSDS233', section: '003' }
  ]);

  const [studyRequests, setStudyRequests] = useState([
    { id: 'req1', userId: 'user2', userName: 'Sarah Chen', classId: 'class1', className: 'CSDS281', topic: 'Midterm Review', studyType: 'learn-together', date: '2025-11-02', time: '14:00', duration: '2 hours', status: 'open' },
    { id: 'req2', userId: 'user3', userName: 'Mike Torres', classId: 'class1', className: 'CSDS281', topic: 'Chapter 4 Problems', studyType: 'work-independently', date: '2025-11-01', time: '16:00', duration: '1.5 hours', status: 'open' }
  ]);

  const [matches, setMatches] = useState([
    {
      id: 'match1',
      classId: 'class1',
      className: 'CSDS281',
      participants: ['user1', 'user4'],
      participantNames: ['Alex Johnson', 'Jordan Lee'],
      messages: [
        { id: 'msg1', userId: 'user4', userName: 'Jordan Lee', text: 'Hey! Ready to study for the midterm?', timestamp: '2025-10-30T14:30:00' },
        { id: 'msg2', userId: 'user1', userName: 'Alex Johnson', text: 'Yes! Want to meet at the library?', timestamp: '2025-10-30T14:32:00' }
      ],
      notes: [
        { id: 'note1', fileName: 'Chapter3_Notes.pdf', uploadedBy: 'Jordan Lee', uploadDate: '2025-10-29' }
      ]
    }
  ]);

  const [studySessions] = useState([
    { id: 'session1', type: 'buddy', title: 'CSDS281 Study with Jordan', date: '2025-11-01', time: '14:00', duration: '2h', participants: ['Jordan Lee'] },
    { id: 'session2', type: 'solo', title: 'AIQS100 Reading', date: '2025-11-02', time: '10:00', duration: '1h', participants: [] },
    { id: 'session3', type: 'buddy', title: 'CSDS233 Project Work', date: '2025-11-03', time: '15:00', duration: '3h', participants: ['Sarah Chen', 'Mike Torres'] }
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [showAddClass, setShowAddClass] = useState(false);
  const [newClass, setNewClass] = useState({ code: '', name: '', section: '' });
  const [studyRequest, setStudyRequest] = useState({
    classId: '',
    topic: '',
    studyType: 'learn-together',
    date: '',
    time: '',
    duration: '1'
  });

  const handleAddClass = () => {
    if (newClass.code && newClass.name) {
      setUserClasses([...userClasses, { 
        id: `class${Date.now()}`, 
        code: newClass.code, 
        name: newClass.name, 
        section: newClass.section 
      }]);
      setNewClass({ code: '', name: '', section: '' });
      setShowAddClass(false);
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedMatch) {
      const updatedMatches = matches.map(match => {
        if (match.id === selectedMatch.id) {
          return {
            ...match,
            messages: [...match.messages, {
              id: `msg${Date.now()}`,
              userId: currentUser.id,
              userName: currentUser.name,
              text: newMessage,
              timestamp: new Date().toISOString()
            }]
          };
        }
        return match;
      });
      setMatches(updatedMatches);
      setSelectedMatch(updatedMatches.find(m => m.id === selectedMatch.id));
      setNewMessage('');
    }
  };

  const handleSubmitStudyRequest = () => {
    if (studyRequest.classId && studyRequest.topic && studyRequest.date && studyRequest.time) {
      const selectedClassObj = userClasses.find(c => c.id === studyRequest.classId);
      const newRequest = {
        id: `req${Date.now()}`,
        userId: currentUser.id,
        userName: currentUser.name,
        classId: studyRequest.classId,
        className: selectedClassObj.code,
        topic: studyRequest.topic,
        studyType: studyRequest.studyType,
        date: studyRequest.date,
        time: studyRequest.time,
        duration: `${studyRequest.duration} hour${studyRequest.duration > 1 ? 's' : ''}`,
        status: 'open'
      };
      setStudyRequests([...studyRequests, newRequest]);
      setStudyRequest({ classId: '', topic: '', studyType: 'learn-together', date: '', time: '', duration: '1' });
      setActiveScreen('find-buddy');
    }
  };

  return (
    <View style={styles.container}>
      {activeScreen === 'home' && (
        <HomeScreen 
          userClasses={userClasses}
          matches={matches}
          currentUser={currentUser}
          setSelectedClass={setSelectedClass}
          setSelectedMatch={setSelectedMatch}
          setActiveScreen={setActiveScreen}
          setShowAddClass={setShowAddClass}
        />
      )}
      {activeScreen === 'find-buddy' && (
        <FindBuddyScreen 
          studyRequests={studyRequests}
          currentUser={currentUser}
          setActiveScreen={setActiveScreen}
        />
      )}
      {activeScreen === 'create-request' && (
        <CreateRequestScreen 
          userClasses={userClasses}
          studyRequest={studyRequest}
          setStudyRequest={setStudyRequest}
          handleSubmitStudyRequest={handleSubmitStudyRequest}
          setActiveScreen={setActiveScreen}
        />
      )}
      {activeScreen === 'calendar' && (
        <CalendarScreen studySessions={studySessions} />
      )}
      {activeScreen === 'profile' && (
        <ProfileScreen 
          currentUser={currentUser}
          userClasses={userClasses}
          setShowAddClass={setShowAddClass}
          onLogout={onLogout}
        />
      )}
      {activeScreen === 'class-detail' && (
        <ClassDetailScreen 
          selectedClass={selectedClass}
          matches={matches}
          currentUser={currentUser}
          setSelectedMatch={setSelectedMatch}
          setActiveScreen={setActiveScreen}
        />
      )}
      {activeScreen === 'chat' && (
        <ChatScreen 
          selectedMatch={selectedMatch}
          currentUser={currentUser}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          handleSendMessage={handleSendMessage}
          setActiveScreen={setActiveScreen}
        />
      )}
      
      <AddClassModal 
        showAddClass={showAddClass}
        setShowAddClass={setShowAddClass}
        newClass={newClass}
        setNewClass={setNewClass}
        handleAddClass={handleAddClass}
      />
      
      {activeScreen !== 'chat' && <NavBar activeScreen={activeScreen} setActiveScreen={setActiveScreen} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
});