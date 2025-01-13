import { UserCard } from './UserCard'

export function UserList({ users }) {
  if (!users?.length) {
    return <p>No users found</p>
  }

  return (
    <ul className='grid grid-cols-auto justify-center gap-4 w-2/3 pt-4 pb-4'>
      {users.map(user => (
        <li key={user.id}>
          <UserCard user={user} />
        </li>
      ))}
    </ul>
  )
}
