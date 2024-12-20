import { Text, View } from 'react-native'


const QView = ({ title, question, answer }: { title: string, question: string, answer: string[] }) => {
    return (
        <View>
            <Text className='text-[14px] font-semibold'>{title}</Text>
            <Text className='text-[14px] font-normal'>{question}</Text>
            <Text className='text-[14px] font-normal text-[#5D5FEF]'> {
                answer.length === 1 ? '1 response' : `${answer.length} responses`
            }</Text>
        </View>
    )
}
export default QView