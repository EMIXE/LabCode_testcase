import React from 'react'
import emojiSad from '../emoji/sad.png'
import emojiHappy from '../emoji/happy.png'
import emojiConfused from '../emoji/confused.png'

function Emoji({face, faceHandler}) {
    const width = 240
    const height = 240

    function getSrcEmoji(face) {
        switch(face) {
            case 'sad': return emojiSad
            case 'happy': return emojiHappy
            case 'confused': return emojiConfused
            default: return;
        }
    }


    const styles = {
        img: {
          margin: '60px',
        }
      }

    return(
        <div>
            <img  style={styles.img} src={getSrcEmoji(face)} width={width} height={height} alt="emoji" onClick={() => faceHandler(face)} />
        </div>
    )
}
export default Emoji