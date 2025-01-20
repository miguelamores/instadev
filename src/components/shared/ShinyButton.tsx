import ShinyText from './ShinyText'

type ShinyButtonProps = {
  text: string
  onClick: () => void
}

export function ShinyButton({ text, onClick }: ShinyButtonProps) {
  return (
    <button
      className='text-gray-900 border w-full md:w-auto border-gray-300 focus:outline-none hover:bg-gray-700 focus:ring-4 focus:ring-gray-700 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700'
      onClick={onClick}
    >
      <ShinyText speed={3} text={text} />
    </button>
  )
}
