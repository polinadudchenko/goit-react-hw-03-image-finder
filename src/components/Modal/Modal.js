import PropTypes from 'prop-types'
import { Component } from 'react'
import { createPortal } from 'react-dom'
import{StyledOverlay, StyledModal} from './Modal.styled'

const modalRoot = document.getElementById('modal-root')

class Modal extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    onClose: PropTypes.func.isRequired,
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleEscape)
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleEscape)
  }

  handleEscape = (e) => {
    if (e.code === 'Escape') {
        this.props.onClose()
    }
  }

  handleClose = (e) => {
    if (e.target === e.currentTarget) {
      this.props.onClose()
    }
  }

  render() {
    return createPortal(<StyledOverlay onClick={this.handleClose}>
        <StyledModal>
          {this.props.children}
        </StyledModal>
      </StyledOverlay>, modalRoot)
  }  
  
}

export default Modal