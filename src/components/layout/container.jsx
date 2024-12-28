import PropTypes from 'prop-types'
import Navbar from '../navbar'

const Container = ({ children }) => {
  return (
    <div className="bg-primary text-snow">
      <Navbar />
      <main className="">{children}</main>
    </div>
  )
}

Container.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Container
