import { Avatar } from './Avatar'
import styles from './Sidebar.module.css'
import { PencilSimpleLine } from 'phosphor-react'
export function SideBar() {
  return (
    <aside className={styles.sidebar}>
      <img
        className={styles.cover}
        src="https://images.unsplash.com/photo-1604964432806-254d07c11f32?w=500&auto=format&fit=crop&q=50&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZGV2ZWxvcGVyfGVufDB8fDB8fHww"
      />

      <div className={styles.profile}>
        <Avatar src="https://github.com/jordanguimaraes17.png" />

        <strong>Jordan Guimarães</strong>
        <span>Web Developer </span>
      </div>

      <footer>
        <a href="#">
          <PencilSimpleLine size={20} />
          Editar seu perfil
        </a>
      </footer>
    </aside>
  )
}
