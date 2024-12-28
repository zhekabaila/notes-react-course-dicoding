import { showFormattedDate } from '../../utils'
import PropTypes from 'prop-types'

const Card = ({
  id,
  title,
  body,
  createdAt,
  onDelete,
  archived,
  onChangeNoteStatus,
}) => {
  return (
    <div className="flex flex-col justify-between bg-primary border border-snow rounded-sm">
      <div className="p-4">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-gray-400 text-sm font-semibold mt-0.5">
          {showFormattedDate(createdAt)}
        </p>
        <p className="text-base font-medium mt-3">{body}</p>
      </div>
      <div className="flex items-center">
        <button
          type="button"
          className="bg-primary border border-snow rounded-sm basis-1/2 p-1.5 text-danger"
          onClick={() => onDelete(id)}
        >
          Delete
        </button>
        <button
          type="button"
          className="bg-primary border border-snow rounded-sm basis-1/2 p-1.5 text-warning"
          onClick={() => onChangeNoteStatus(id)}
        >
          {archived ? 'Aktifkan' : 'Arsipkan'}
        </button>
      </div>
    </div>
  )
}

Card.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  archived: PropTypes.bool.isRequired,
  createdAt: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  onChangeNoteStatus: PropTypes.func.isRequired,
}

export default Card
