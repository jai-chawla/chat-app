import React from 'react';
// import { FaPlusCircle,FaFileImage,FaGift,FaPaperPlane } from "react-icons/fa";
import {useSelector } from 'react-redux';

const MessageSend = ({inputHendle,newMessage,sendMessage,emojiSend,ImageSend}) => {

     const emojis = [
          '😀', '😃', '😄', '😁',
          '😆', '😅', '😂', '🤣',
          '😊', '😇', '🙂', '🙃',
          '😉', '😌', '😍', '😝',
          '😜', '🧐', '🤓', '😎',
          '😕', '🤑', '🥴', '😱'
      ]

const {themeMood} = useSelector(state => state.messenger );


  return (

     <div className='message-send-section'>
          <input type="checkbox" id='emoji' />
             <div className='files hover-attachment'>
                  <div className='add-attachment'>
                         Add Attachment
                  </div>
                  {/* <FaPlusCircle /> */}
                  </div>  

          <div className='files hover-image'>
               <div className='add-image'>
                    Add Image 
               </div>
               <input onChange={ImageSend} type="file" id="pic" className='form-control' />
               {/* <label htmlFor='pic'> <FaFileImage/> </label> */}
          </div>

          <div className='files hover-gift'>
               <div className='add-gift'>
                    Add gift
               </div>
               {/* <FaGift /> */}
          </div>

     <div className='message-type'>
          <input type="text" onChange={inputHendle} name='message' id='message' placeholder='Aa' className='form-control' value={newMessage}/>

          <div className='files hover-gift'>
               <label htmlFor='emoji' className="heart"> ❤ </label>
          </div>
     </div>

     <div  onClick={sendMessage} className='files'>
     {/* <FaPaperPlane/> */}
     </div>

     <div className='emoji-section'>
          <div className='emoji'>
               {
                    emojis.map(e => <span onClick={()=>emojiSend(e)} >{e}</span>)
               }

          </div>

     </div>


     </div>

  )
};

export default MessageSend;