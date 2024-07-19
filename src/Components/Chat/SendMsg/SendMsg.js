import "./SendMsg.css"
import SendIcon from '@mui/icons-material/Send';
import { useRef } from 'react';


export default function SendMsg({chatId}) {
  const messageRef = useRef();

  const handleSendMessage = async () => {
    const message = messageRef.current.value.trim();
    if (message === '') return;

    try {
      const response = await fetch('http://localhost:5000/msg/sendMessage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          chatId,
          content: message,
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        // Handle successful message sending
        console.log('Message sent:', data);
      } else {
        console.error('Failed to send message:', data.error);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }

    messageRef.current.value = '';
  };


  return (
    <div className="send-msg-cont">
      <div className="txtar mx-2">
        <textarea className="ip" placeholder="Send Message.." rows={1} ref={messageRef}/>
      </div>
      <div className="sendbtn mx-3"><button onClick={handleSendMessage} className="abcde"><SendIcon/></button></div>
    </div>
  )
}
