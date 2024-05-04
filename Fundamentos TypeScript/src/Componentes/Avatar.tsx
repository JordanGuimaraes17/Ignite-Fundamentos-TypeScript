import { ImgHTMLAttributes } from 'react';/* para ter todos elementos diponiveis da img*/
import styles from './Avatar.module.css'

interface  AvatarProps extends ImgHTMLAttributes<HTMLImageElement>{/*<HTMLImageElement> paramentro para usar os elementos no html*/
  hasBorder?:boolean;/* quando coloca ? é porque os hasBorder é opcional se não seria obrigado a passar em todos os lugares onde usar avatar */
  
}

export function Avatar({ hasBorder = true, ...props }: AvatarProps) {/*...props usa para nãp ficar precisando passar cada atributo individual , ex: src, alt, onclick etc..., passa os rest operator ...   */
  return (
    <img
      className={hasBorder ? styles.avatarWithBorder : styles.avatar}
      {...props}

    />
  )
}
