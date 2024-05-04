import { ThumbsUp, Trash } from 'phosphor-react'
import styles from './Comment.module.css'
import { Avatar } from './Avatar'
import { useState } from 'react'




interface CommentProps{
  content:string;
  onDeleteComment: (commentToDelete:string)=> void; /* onDeleteComment é uma função que não retorna nada então usa void, mas deleteComment em post recebe um paramentro que é string, tambem tenho que passar aqui .*/

}

export function Comment({ content, onDeleteComment }: CommentProps) {
  const [likeCount, setLikeCount] = useState(0)

  function handleDeleteComment() {
    onDeleteComment(content)
  }

  function handleLikeComment() {
    setLikeCount(state => {
      /* sempre que for atualizar uma informação e essa informação depende do valor que ela tinha anteriormente ou seja depende dela mesma sempre usar esse padrao*/
      return state + 1
    })
  }

  return (
    <div className={styles.comment}>
      <Avatar
        hasBorder={false}
        src="https://github.com/jordanguimaraes17.png" alt=''
      />
      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>Jordan Guimarães</strong>
              <time
                title="30 de abril  às 9:12h"
                dateTime="2024-04-30 09:11:10"
              >
                cerca de 1h atrás
              </time>
            </div>
            <button onClick={handleDeleteComment} title="Deletar Comentário">
              <Trash size={24} />
            </button>
          </header>
          <p>{content}</p>
        </div>

        <footer>
          <button onClick={handleLikeComment}>
            <ThumbsUp />
            Aplaudir <span>{likeCount}</span>
          </button>
        </footer>
      </div>
    </div>
  )
}
