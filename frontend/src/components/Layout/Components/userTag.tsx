import { RootState } from "@/redux/store"
import { FaRegCircleUser } from "react-icons/fa6"
import { useSelector } from "react-redux"
export const UserTag = ({ userId, username }: { userId: string; username: string }) => {
  const onlineUsers = useSelector((state: RootState) => state.onlineUsers)
  const checkUserOnline = onlineUsers.includes(userId.toString())
  console.log("CheckUserOnline", typeof onlineUsers[0], userId, checkUserOnline)
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative rounded-full">
        <FaRegCircleUser size={24}></FaRegCircleUser>
        {checkUserOnline && <div className="absolute -right-1 bottom-4 z-10 rounded-full bg-green-600 p-1.5"></div>}
      </div>
      <p className="text-base font-medium text-white">{username}</p>
    </div>
  )
}
