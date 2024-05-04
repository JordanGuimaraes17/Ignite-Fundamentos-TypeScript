import { format, formatDistanceToNow } from "date-fns"
import ptBR from 'date-fns/locale/pt-BR'
import styles from './Post.module.css'
import { Comment } from './Comment'
import { Avatar } from './Avatar'
import { ChangeEvent, FormEvent, InvalidEvent, useState, } from 'react'

interface Author{
  name:string;
  role:string;
  avatarUrl:string;
}
interface  Content{
  type:'paragraph'| 'link';
  content:string;

}
 export interface PostType{
  id:number;
  author:Author;
  publishedAt:Date;
  content:Content[];
}

interface PostProps{
  post:PostType;
}

export function Post({ post }:PostProps) {
  const [comments, setComments] = useState(['Post muito bacana!'])
  const [newCommentText, setNewCommentText] = useState('')

  /* usar biblioteca npm i date-fns para lidar com formato da hora*/
  const publishedDateFormatted = format(
    /* metodo do format do date-fns*/
    post.publishedAt,
    "d 'de' LLLL 'às' HH:mm'h'",
    {
      locale: ptBR,
    }
  )

  const publishedDateRelativeNow = formatDistanceToNow(post.publishedAt, {
    locale: ptBR,
    addSuffix: true
  })

  function handleCreateNewComment(event: FormEvent) {/*  FormEvent é um evento de  da tag Form */
    event.preventDefault()
    setComments([...comments, newCommentText])
    setNewCommentText('')
  }

  function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {/* ChangeEvent ,evento do  Onchange, para avisar que é dentro do text area <HTMLTextAreaElement> tipo uma paramento, aconteu no formulario mas não foi a no form mas no textearea */
    event.target.setCustomValidity('')
    setNewCommentText(event.target.value)
  }

  function handleNewCommentInvalid(event:InvalidEvent<HTMLTextAreaElement>) {/*InvalidEvent, validação para não permitir se estiver vazio o textearea, dentro do textarea <HTMLTextAreaElement> */
    event.target.setCustomValidity('Esse campo é obrigatório!')
  }

  function deleteComment(commentToDelete:string) {/* paramentro passado como string */
    const commentsWithouDeletedOne = comments.filter(comment => {
      return comment !== commentToDelete
    })
    setComments(commentsWithouDeletedOne)
  }

  const isNewCommentEmpty = newCommentText.length === 0

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={post.author.avatarUrl} />
          <div className={styles.authorInfo}>
            <strong>{post.author.name}</strong>
            <span>{post.author.role} </span>
          </div>
        </div>

        <time
          title={publishedDateFormatted}
          dateTime={post.publishedAt.toISOString()}
        >
          {publishedDateRelativeNow}
        </time>
      </header>

      <div className={styles.content}>
        {post.content.map(line => {
          if (line.type === 'paragraph') {
            return <p key={line.content}> {line.content}</p>
          } else if (line.type === 'link') {
            return (
              <p key={line.content}>
                <a href="#">{line.content}</a>
              </p>
            )
          }
        })}
      </div>

      <form onSubmit={handleCreateNewComment} className={styles.comentForm}>
        <strong>Deixe seu feedback</strong>
        <textarea
          name="comment"
          value={newCommentText}
          placeholder="Deixe um comentário"
          onChange={handleNewCommentChange}
          onInvalid={handleNewCommentInvalid}
          required
        />
        <footer>
          <button type="submit" disabled={isNewCommentEmpty}>
            Publicar
          </button>
        </footer>
      </form>

      <div className={styles.comentList}>
        {comments.map(comment => {
          return (
            <Comment
              key={comment}
              content={comment}
              onDeleteComment={deleteComment}
            />
          )
        })}
      </div>
    </article>
  )
}
