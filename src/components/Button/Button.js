import PropTypes from 'prop-types';
import { StyledButton } from './Button.styled';

export default function Button({loadMoreImages}) {
    return <>
            <StyledButton id='load-btn' type='button' onClick={loadMoreImages}>Load more</StyledButton>
        </>
}

Button.propTypes = {
    loadMoreImages: PropTypes.func.isRequired,
}