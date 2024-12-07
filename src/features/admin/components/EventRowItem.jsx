import { FaRegComment } from "react-icons/fa"
import { MdOutlinePlaylistAddCheck } from "react-icons/md"
import { Link } from "react-router-dom"
import { formatDateShort } from "../../../shared/utils"
// import { formatDateShort } from "../../../shared/utils"

export const EventRowItem = ({event}) => {
  return (
    <tr key={event.id}>
        <td className="px-6 py-4 text-sm font-medium text-gray-900">{event.title}</td>
        <td className="px-6 py-4 text-sm text-gray-500">{event.categoryName}</td>
        <td className="px-6 py-4 text-sm text-gray-500">{event.organizerName}</td>
        <td className="px-6 py-4 text-sm text-gray-500">{formatDateShort(event.date)}</td>
        <td className="px-6 py-4 text-sm text-gray-500 ">
        <FaRegComment className="w-5 h-5 mr-1"/>
                    {/* {event.data.commentsCount} */}
                    10
        </td>
        <td className="px-6 py-4 text-sm text-gray-500 ">
        <MdOutlinePlaylistAddCheck className="w-5 h-5 mr-1"/>
                    {/* {event?.data?.attendancesCount} */}
                    15
        </td>
        <td className="px-6 py-4 text-sm font-medium">
          <Link
            to={`/main/event/:id`}
            className="text-blue-600 hover:text-blue-800"
          >
            Ver detalles
          </Link>
        </td>
    </tr>
  )
}
