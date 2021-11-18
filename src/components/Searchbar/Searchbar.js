import PropTypes from 'prop-types'
import { Component } from 'react'
import { toast } from 'react-toastify';
import {StyledSearchbar, StyledSearchForm, StyledSearchBtn, StyledSearchBtnLabel, StyledSearchInput} from './Searchbar.styled'

class Searchbar extends Component {

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  }

  state = {
    input: '',

  }

  handleChange = (e) => {
    this.setState({input: e.currentTarget.value})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { input } = this.state;
    if (input.trim() === '') {
      toast.info('Please type a query')
      return
    }

    this.props.onSubmit(input);
    this.setState({input: ''})

  }

  render() {
    const { input } = this.state;
    return <StyledSearchbar>
    <StyledSearchForm onSubmit={this.handleSubmit}>
      <StyledSearchBtn type="submit">
        <StyledSearchBtnLabel>Search</StyledSearchBtnLabel>
      </StyledSearchBtn>

        <StyledSearchInput
          type="text"
          onChange={this.handleChange}
          value={input}
        autoComplete="off"
        autoFocus
        placeholder="Search images and photos"
        />
    </StyledSearchForm>
  </StyledSearchbar>
  }
}

export default Searchbar