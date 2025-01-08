export function ExploreList({ posts }) {
  if (!posts.length) {
    return <p>No posts found</p>
  }

  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>{post.content}</li>
      ))}
    </ul>
  )
}
