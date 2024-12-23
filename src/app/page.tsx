import Link from 'next/link'
 
function Home() {
  return (
    <ul>
      <li>
        <Link href="/">Home</Link>
      </li>
      <li>
        <Link href="/signup">Sign Up</Link>
      </li>
      <li>
        <Link href="/login">Log In</Link>
      </li>
    </ul>
  )
}
 
export default Home