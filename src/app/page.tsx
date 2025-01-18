import Link from "next/link"
import Shampoo from "../components/Shampoo"
export default function Home(){
  return(
    <div className="">
      <Link href='/women'>women</Link>
      <Link href='/men'>Men</Link>
      <Link href='/'>Kids</Link>
      <Link href='/'>Customized</Link>
      <Shampoo category="mshampoo"/>
    </div>
  )
}
