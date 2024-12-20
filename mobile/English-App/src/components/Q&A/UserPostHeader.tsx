import { View, Text, ImageSourcePropType,Image } from 'react-native'

const UserView = ({ avatar, name, date }: { avatar: ImageSourcePropType, name: string, date: Date }) => {
    return (
        <View className='flex flex-row items-center'>
            <Image source={avatar} className='w-10 h-10'/>
            <View className='ml-[14px]'>
                <Text className='text-[14px] font-normal'>{name}</Text>
                <Text className='text-[13px] font-normal'>{date.toDateString()}</Text>
            </View>
        </View>
    )
}
export default UserView