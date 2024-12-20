import styles from "./styles.module.css"
interface AnswerProps {
  content: string
  index: number
  [key: string]: unknown // để cho phép các prop bổ sung
}
const Answer = ({ content, index, ...props }: AnswerProps) => {
  return (
    <div
      key={content}
      className={`${styles.answer} flex gap-2 rounded-lg border-[1px] bg-customPink px-[16px] py-[12px] text-2xl text-black`}
    >
      <span>{index + 1}.</span>
      <p {...props} className="max-w-[800px]">
        {`${content}`}
      </p>
    </div>
  )
}
export default Answer
