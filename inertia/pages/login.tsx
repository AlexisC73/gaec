export default function Login() {
  return (
    <div>
      <form method="post" action="/api/auth/login">
        <input type="email" name="email" />
        <input type="password" name="password" />
        <button>Submit</button>
      </form>
    </div>
  )
}
