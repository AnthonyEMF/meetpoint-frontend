import { FaRegComment } from "react-icons/fa"
import { MdOutlinePlaylistAddCheck } from "react-icons/md"

export const EventDashboardRowItem = ({event}) => {
  return (
    <li className="p-4 bg-gray-50 rounded shadow flex justify-between items-center">
                <div>
                  <p className="font-medium max-w-[150px] text-ellipsis overflow-hidden whitespace-nowrap text-gray-700">{event.title}</p>
                  <p className="text-sm text-gray-500">{event.categoryName}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center text-gray-500 text-sm">
                  <FaRegComment className="w-5 h-5 mr-1"/>
                    {/* {event.data.commentsCount} */}
                    10
                  </div>
                  <div className="flex items-center text-gray-500 text-sm">
                  <MdOutlinePlaylistAddCheck className="w-5 h-5 mr-1"/>
                    {/* {event?.data?.attendancesCount} */}
                    15
                  </div>
                </div>
            </li>
  )
}