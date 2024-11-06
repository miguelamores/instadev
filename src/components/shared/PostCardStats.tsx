import { Models } from 'appwrite'

type PostCardStatsType = {
  post: Models.Document
  userId: string
}

const PostCardStats = ({ post, userId }: PostCardStatsType) => {
  return (
    <div className='flex items-center justify-between'>
      <div className='flex items-center'>
        <img
          src='/public/assets/icons/like.svg'
          alt='like'
          className='w-6 h-6 stroke-white'
          width={24}
          height={24}
        />
        <p>0</p>
      </div>
      <div className='flex items-center'>
        <img
          src='/public/assets/icons/save.svg'
          alt='like'
          className='w-6 h-6 stroke-white'
          width={24}
          height={24}
        />
      </div>
    </div>
  )
}

export default PostCardStats
